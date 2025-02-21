import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { REQUEST } from '@nestjs/core';
import { TokenService } from 'src/jwt/jwt.service';
import { MailerService } from 'src/mailer/service/mailer.service';
import { BcryptService } from 'src/shared/service/bcrypt.service';
import { MongoPopulateOptions, MongoQueryService } from 'src/app/types';
import { SignInDto } from '../dto/sign-in.dto';
import { MessageDto } from '../dto/message.dto';
import { OtpService } from 'src/otp/service/otp.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class UserService {
  private _logger: Logger;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    @Inject(REQUEST) private request: Request,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
    private readonly otpService: OtpService,
  ) {
    this._logger = new Logger('UserService');
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // filter users
  /////////////////////////////////////////////////////////////////////////////////////////////////

  async filter(
    filter: FilterQuery<User>,
    options: MongoQueryService<User> = {},
  ): Promise<[User[], number]> {
    const { populate, pagination, sort = { createdAt: -1 } } = options;
    const query = this.userModel.find(filter);
    if (populate) {
      query.populate(populate);
    }
    const records = pagination
      ? await query
          .skip(pagination.skip)
          .limit(pagination.limit)
          .sort(sort)
          .exec()
      : await query.sort(sort).exec();
    const count = await query.countDocuments();
    return [records, count];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // attempt sign in
  /////////////////////////////////////////////////////////////////////////////////////////////////

  async attemptSignIn<T extends SignInDto>(
    data: T,
  ): Promise<User | MessageDto> {
    const user = await this.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException(`Invalid Credentials`);
    }

    // throttling lock
    if (user.isAccountLocked) {
      throw new UnauthorizedException(
        'Your account is temporarily locked. Please unlock your account',
      );
    }

    //password challenge
    if (!this.passPasswordChallenge(data.password, user)) {
      await this.markFailedLoginAttempt(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.clearFailedLoginAttempts(user);

    //checking 2fa
    if (user.isTwoFAEnabled) {
      const secret = await this.otpService.storeOtp({});

      await this.mailerService.send<SendOtpContext>({
        to: [user],
        subject: 'Two Factor Authentication Request',
        template: 'send-otp',
        context: { secret, intent: 'two factor authentication' },
      });

      return {
        message: `OTP send to ${user.email}, please use that otp to pass two FA`,
      };
    }

    return user;
  }

  /************************************************************************** */
  /************************** FIND BY ID ********************************* */
  /************************************************************************** */

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ _id: id })
      .populate('roles')
      .exec();
    return user;
  }

  /************************************************************************** */
  /************************** FIND BY EMAIL ********************************* */
  /************************************************************************** */

  async findByEmail(
    email: string,
    options: MongoPopulateOptions = {},
  ): Promise<User | null> {
    const { populate } = options;
    const user = this.userModel.findOne({ email });
    if (populate) {
      user.populate(populate);
    }
    return user;
  }

  /************************************************************************** */
  /************************** CREATE USER WITH PASSWORD ***********************/
  /************************************************************************** */
  async create(data: Partial<User>): Promise<User> {
    return await this.userModel.create({
      ...data,
      roles: data.roles?.map((x) => x._id),
      password: this.bcryptService.makeHash(data.password),
    });
  }

  /************************************************************************** */
  /************************** CREATE USER WITHOUT PASSWORD ****************** */
  /************************************************************************** */
  async createWithoutPassword(body: SocialSignUpDto): Promise<User> {
    const standardRole = await this.roleService.findByName(
      RoleType.STANDARD_USER,
    );
    return await this.userModel.create({
      ...body,
      roles: [standardRole],
    });
  }

  /************************************************************************** */
  /****************** SAVE STRIPE CUSTOMER ID IN USER *********************** */
  /************************************************************************** */
  async saveStripeCustomerId(
    user: User,
    stripeCustomerId: string,
  ): Promise<boolean> {
    const updated = await this.userModel.updateOne(
      { _id: user._id },
      { $set: { stripeCustomerId } },
    );

    if (!updated.acknowledged) {
      this._logger.error('Stripe CustomerId not saved in user');
    }
    this._logger.log('Stripe CustomerId saved in user');
    return updated.acknowledged ? true : false;
  }

  async registerUser(body: SignUpDto, roles?: Role[]) {
    let user = await this.findByEmail(body.email);

    if (user) {
      throw new BadRequestException('User already exists with given email!');
    }

    user = await this.create({
      ...body,
      roles,
    });

    return user;
  }

  async validateCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedException(`Invalid Credentials`);
    }

    // throttling lock
    if (user.isAccountLocked) {
      throw new UnauthorizedException(
        'Your account is temporarily locked. Please unlock your account',
      );
    }

    //password challenge
    if (!this.passPasswordChallenge(credentials.password, user)) {
      const allowedEmails = ['test@gmail.com'];

      if (!allowedEmails.includes(user.email)) {
        await this.markFailedLoginAttempt(user);
      }

      throw new UnauthorizedException('Invalid credentials');
    }

    await this.clearFailedLoginAttempts(user);
    return user;
  }

  async attemptLogin<C, P extends Record<string, unknown>>(
    user: User,
    options: {
      claims?: JwtClaim<C>;
      payload?: P;
    } = {},
  ): Promise<
    P & {
      user: AuthUserDto | null;
      accessToken: string | null;
      message: string;
    }
  > {
    type R = P & {
      user: AuthUserDto | null;
      accessToken: string | null;
      message: string;
    };

    const { claims, payload = {} } = options;
    //checking 2fa
    if (user.isTwoFAEnabled) {
      const secret = await this.tokenService.generate(
        user.email,
        TokenType.TwoFactorAuthentication,
      );

      await this.mailerService.send<SendOtpContext>({
        to: [user],
        subject: 'Two Factor Authentication Request',
        template: 'send-otp',
        context: { secret, intent: 'two factor authentication' },
      });

      return {
        message: `OTP send to ${user.email}, please use that otp to pass two FA`,
        ...payload,
        user: null,
        accessToken: null,
      } as R;
    }
    const newUser = new AuthUserDto(user, user.roles);
    return {
      user: newUser,
      ...payload,
      accessToken: this.sign(user, claims),
      message: `Signed in successfully`,
    } as R;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // sign user
  /////////////////////////////////////////////////////////////////////////////////////////////////
  sign<T>(user: User, claims?: JwtClaim<T>): string {
    const payload = {
      user: {
        id: user._id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
      claims: claims || { roleIds: user.roles.map((x) => x._id) },
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  /************************************************************************** */
  /*****************************ADD CLAIM AND SIGN ************************* */
  /************************************************************************** */
  addClaimsAndSign<T>(claims: JwtClaim<T>): string {
    const user = this.request.user as User;
    return this.sign(user, {
      // ...this.request.identity.claims(),
      ...claims,
    });
  }

  /************************************************************************** */
  /************************** REMOVE CLAIM AND SIGN ***************** */
  /************************************************************************** */
  removeClaimsAndSign<T>(...claims: [keyof JwtClaim<T>]): string {
    const user = this.request.user as User;
    const newClaims: JwtClaim<T> = { ...this.request.identity.claims() };
    claims.forEach((claim) => {
      delete newClaims[claim];
    });
    return this.sign(user, {
      ...newClaims,
    });
  }

  /************************************************************************** */
  /************************** COMPARE PASSWORD ******************************* */
  /************************************************************************** */
  passPasswordChallenge(password: string, user: User): boolean {
    return this.bcryptService.compareHash(password, user.password);
  }

  /************************************************************************** */
  /************************** COMPARE OLD PASSWORD ************************** */
  /************************************************************************** */
  validateOldPassword(user: User, password: string): boolean {
    return this.bcryptService.compareHash(password, user.password);
  }

  /************************************************************************** */
  /************************** CHANGE PASSWORD ******************************* */
  /************************************************************************** */
  async changePassword(user: User, password: string): Promise<boolean> {
    const updated = await this.userModel.updateOne(
      { _id: user._id },
      { $set: { password: this.bcryptService.makeHash(password) } },
      { new: true },
    );
    return updated ? true : false;
  }

  /************************************************************************** */
  /************************** GET ALL PLATFORM USERS ************************ */
  /************************************************************************** */
  async find(pagination: PaginationQuery): Promise<[User[], number]> {
    const users = await this.userModel
      .find()
      .skip(pagination.skip)
      .limit(pagination.limit);
    const count = await this.userModel.countDocuments();
    return [users, count];
  }

  /************************************************************************** */
  /************************** GET FIRST ************************ */
  /************************************************************************** */
  async first(
    filter: FilterQuery<User>,
    options: MongoPopulateOptions = {},
  ): Promise<User> {
    const { populate } = options;
    const qb = this.userModel.findOne(filter);
    if (populate) {
      qb.populate(populate);
    }
    return await qb.exec();
  }

  /************************************************************************** */
  /************************** THROTTLING  ************************************ */
  /************************************************************************** */

  async markFailedLoginAttempt(user: User): Promise<boolean> {
    const updated = await this.userModel.updateOne(
      { _id: user._id },
      {
        $inc: {
          failedLoginAttempts: 1,
        },
      },
    );
    return updated.acknowledged ? true : false;
  }

  async clearFailedLoginAttempts(user: User): Promise<boolean> {
    const updated = await this.userModel.updateOne(
      { _id: user._id },
      { $set: { failedLoginAttempts: 0 } },
    );
    return updated.acknowledged ? true : false;
  }

  /************************************************************************** */
  /************************** UN-LOCK ACCOUNT ******************************* */
  /************************************************************************** */

  async unlockAccount(user: User): Promise<boolean> {
    return await this.clearFailedLoginAttempts(user);
  }

  /************************************************************************** */
  /************************** RESET PASSWORD ******************************* */
  /************************************************************************** */

  async resetPassword(user: User, password: string): Promise<boolean> {
    const updated = await this.userModel.updateOne(
      { _id: user._id },
      { $set: { password: this.bcryptService.makeHash(password) } },
    );
    return updated ? true : false;
  }

  /************************************************************************** */
  /************************** MARK EMAIL VERIFIED ******************************* */
  /************************************************************************** */
  async markEmailVerified(user: User): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { emailVerifiedAt: new Date() } },
      { new: true },
    );
  }

  /************************************************************************** */
  /************************** UPDATE PROFILE ******************************* */
  /************************************************************************** */

  async updateProfile(user: User, body: Partial<User>): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id: user._id }, { $set: body }, { new: true })
      .populate('roles');
  }

  /************************************************************************** */
  /************************** CHANGE AVATAR ******************************* */
  /************************************************************************** */

  async changeAvatar(user: User, file: Express.Multer.File): Promise<User> {
    // Delete previous avatar if exists
    if (user?.avatar?.fileId) {
      await this.fileService.deleteFile(user?.avatar?.fileId);
    }

    // Upload new avatar and update user document with new avatar id and url
    const res = await this.fileService.uploadFile(file);

    // Update user document with new avatar id and url
    return await this.userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { avatar: res } },
      { returnDocument: 'after', populate: 'roles' },
    );
  }

  /************************************************************************** */
  /************************** TOGGLING TWO FA ******************************* */
  /************************************************************************** */

  async updateTwoFactorAuth(user: User) {
    return await this.userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { isTwoFAEnabled: !user.isTwoFAEnabled } },
      { returnDocument: 'after' },
    );
  }

  /************************************************************************** */
  /************* delete User ******************** *************************** */
  /************************************************************************** */

  async deleteUser(user: User): Promise<string> {
    await this.userModel.findByIdAndDelete(user.id);
    return 'User is deleted';
  }

  async getAdmin() {
    const adminRole = await this.roleService.first({
      name: RoleType.PLATFORM_OWNER,
    });

    return await this.userModel.findOne({
      roles: { $in: [adminRole] },
    });
  }
}
