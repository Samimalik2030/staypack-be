import { Body, Controller, Get, NotAcceptableException, NotFoundException, Param, Patch, Post, UnprocessableEntityException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { verifyOTPDto } from '../dto/verify-otp.dto';
import { OtpService } from 'src/otp/service/otp.service';
import { OtpType } from 'src/otp/types';
import { AuthUserDto } from '../dto/auth-user.dto';
import { MessageDto } from '../dto/message.dto';
import { User } from '../schema/user.schema';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  @Post('signUp')
  async signUp(@Body() body: SignUpDto): Promise<AuthUserDto> {
    const foundUser = await this.userService.findByEmail(body.email);
    if (foundUser) {
      throw new UnprocessableEntityException('User already exists');
    }
    const registeredUser = await this.userService.signUp(body);
    return registeredUser;
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInDto): Promise<AuthUserDto> {
    const user = await this.userService.signIn(data);
    if (!user) {
      throw new NotAcceptableException('invalid credential');
    }
    return user;
  }

  @Post('forgot-Password')
  async forgotPassword(@Body() body: forgotPasswordDto): Promise<MessageDto> {
    const user = await this.userService.forgotPassword(body);
    return user;
  }

  @Post('verify-otp')
  async verifyOTP(@Body() body: verifyOTPDto): Promise<MessageDto> {
    const user = await this.userService.findByEmail(body.email);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const found = await this.otpService.verifyOtp(body.otp, body.type, user);
    if (!found) {
      throw new NotFoundException('Invalid otp');
    }
    return {
      message: 'Otp verified successfully',
    };
  }

  @Patch('reset-Password')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<User | null> {
    const foundUser = await this.userService.findByEmail(body.email);
    if (!foundUser) {
      throw new NotFoundException('User is not found');
    }
    console.log(foundUser, 'found user');
    const found = await this.otpService.verifyOtp(
      body.otp,
      OtpType.FORGOT_PASSWORD,
      foundUser,
    );

    if (!found) {
      throw new NotFoundException('Invalid otp');
    }

    const updatedUser = await this.userService.updatePassword(
      foundUser.id,
      body.password,
      body.confirmPassword,
    );
    return updatedUser; 
  }

    async changeAvatar(@UploadedFile() file:Express.Multer.File){

     console.log(file,'file')
    }


    
    @Get(":id")
    async getUser(@Param() id:string){
        const foundUser = await this.userService.getUser(id)
        return foundUser
    }
  
   
}
