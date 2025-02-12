import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { TokenService } from 'src/jwt/jwt.service';
import { OtpService } from 'src/otp/service/otp.service';
import { OtpType } from 'src/otp/types';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private readonly UserModel:Model<User>,
      private readonly jwtTokenService:TokenService,
      private readonly otpService:OtpService

    
    ){}

    async findByEmail(email:string){
    return await this.UserModel.findOne({
            email:email
        })
    }
    async findOne(data:Partial<User>){
     return await this.UserModel.findOne(data)
    }

    async signUp(data:SignUpDto){
      const createdUser = await this.UserModel.create({
        email:data.email
      })
      const token = await this.jwtTokenService.generateToken({
        email:createdUser.email,
        id:createdUser._id,
        role:createdUser.role
      })
      return {
        token:token,
        user:createdUser
      }
    }
  
  async signIn(data:SignInDto){
    const user = await this.UserModel.findOne({
        email:data.email,
        password:data.password
    })
    if(!user){
        throw new NotFoundException('invalid credantial')
    }
    const token = await this.jwtTokenService.generateToken({
      email:user.email,
      id:user._id,
      role:user.role
    })
    return {
      token:token,
      user:user
    }
  }

  async forgotPassword(data:forgotPasswordDto){
    const user = await this.UserModel.findOne({
        email:data.email
    })
    if(!user){
        throw new NotFoundException ('user not found')
    }
  const otp =  Math.floor(100000 + Math.random() * 900000);
     await this.otpService.storeOtp({
      otp:otp,
      type:OtpType.FORGOT_PASSWORD,
      user:user
     })
    return {
      message:`Otp sent to your email.Please use this otp ${otp}`
    }
  }


 

  async updatePassword(id:string,password:string,confirmPassword:string){

 const updatedPassword = await this.UserModel.findByIdAndUpdate(id,{
    password:password,
    confirmPassword:confirmPassword
 },{
    returnDocument:'after'
  }
)
  return updatedPassword
 
    }      
}
