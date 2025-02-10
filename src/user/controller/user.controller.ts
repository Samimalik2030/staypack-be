import { Body, Controller, Get, NotAcceptableException, NotFoundException, Patch, Post, UnprocessableEntityException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import path from 'path';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';  // Import Multer
import { verifyOTPDto } from '../dto/verify-otp.dto';
import { OtpService } from 'src/otp/service/otp.service';
import { OtpType } from 'src/otp/types';



@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService,
        private readonly otpService:OtpService
    ){}

    @Post("signUp")
    async signUp(@Body() body:SignUpDto){
        const foundUser = await this.userService.findByEmail(body.email)
        if(foundUser){
            throw new UnprocessableEntityException('User already exists')
        }
        const registeredUser = await this.userService.signUp(body)
        return registeredUser
    }

    @Post("sign-in")
    async signIn(@Body() data:SignInDto){
        const user = await this.userService.signIn(data)
        if(!user){
            throw new NotAcceptableException('invalid credential')
        }
        return user

    }
    @Post('forgot-Password')
    async forgotPassword(@Body() body:forgotPasswordDto){
        const user = await this.userService.forgotPassword(body)
        return user
    }

    @Post('verify-otp')
    async verifyOTP(@Body() body:verifyOTPDto){
        const user = await this.userService.findByEmail(body.email)
        if(!user){
            throw new NotFoundException("User not found")
        }
         const found = await this.otpService.verifyOtp(body.otp,body.type,user)
             if(!found){
              throw new NotFoundException('Invalid otp')
             }
             return {
                message:"Otp verified successfully"
             }
    }

    @Patch('reset-Password')
    async resetPassword(@Body() body:ResetPasswordDto){
        const foundUser = await this.userService.findByEmail(body.email)
        if(!foundUser){
            throw new NotFoundException('User is not found')
        }
        const found = await this.otpService.verifyOtp(body.otp,OtpType.FORGOT_PASSWORD,foundUser)
             if(!found){
              throw new NotFoundException('Invalid otp')
             }

             const updatedUser= await this.userService.updatePassword(foundUser.id,body.password,body.confirmPassword)
        
    }


    @Patch("/change-avatar")
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            photo: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('photo'))
    async changeAvatar(@UploadedFile() file:Express.Multer.File){

     console.log(file,'file')
    }
  
   
}
