import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { TokenService } from 'src/jwt/jwt.service';
import { OtpType } from 'src/otp/types';
import { OTPService } from 'src/otp/service/otp.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly jwtTokenService: TokenService,
    private readonly otpService: OTPService,
  ) {}

  async filter(data: Partial<User>): Promise<User[]> {
    return await this.UserModel.find(data);
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({
      email: email,
    });
  }
  async findOne(data: Partial<User>) {
    return await this.UserModel.findOne(data);
  }

  async signUp(data: SignUpDto) {
    const createdUser = await this.UserModel.create(data);
    const token = await this.jwtTokenService.generateToken({
      email: createdUser.email,
      id: createdUser._id,
      role: createdUser.role,
    });
    return {
      token: token,
      user: createdUser,
    };
  }

  async signIn(data: SignInDto) {
    const user = await this.UserModel.findOne({
      email: data.email,
      password: data.password,
    });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const token = await this.jwtTokenService.generateToken({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return {
      token: token,
      user: user,
    };
  }

  async forgotPassword(data: forgotPasswordDto) {
    const user = await this.UserModel.findOne({
      email: data.email,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const otp = await this.otpService.generate(
      user.email,
      OtpType.FORGOT_PASSWORD,
    );

    return {
      message: `Otp sent to your email.Please use this otp ${otp}`,
    };
  }

  async updatePassword(id: string, password: string, confirmPassword: string) {
    const updatedPassword = await this.UserModel.findByIdAndUpdate(
      id,
      {
        password: password,
        confirmPassword: confirmPassword,
      },
      {
        returnDocument: 'after',
      },
    );
    return updatedPassword;
  }

  async delete(id: string) {
    const deletedUser = await this.UserModel.findByIdAndDelete(id);
    return deletedUser;
  }
  async getUser(id: string) {
    const foundedUser = await this.UserModel.findById(id);
    return foundedUser;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
}
