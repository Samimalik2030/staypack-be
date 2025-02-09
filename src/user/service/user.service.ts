import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { TokenService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private readonly UserModel:Model<User>,
      private readonly jwtTokenService:TokenService
    
    ){}

    async findByEmail(email:string){
    return await this.UserModel.findOne({
            email:email
        })
    }

    async signUp(data:SignUpDto){
      const createdUser = await this.UserModel.create(data)
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
        email:data.email
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
    return otp
  }


  async updatePassword(data:ResetPasswordDto){
 const   user = await this.UserModel.findOne({
    email:data.email
 })
 if(!user){
    throw new  NotFoundException('user not found')
 }
 const updatedPassword = await this.UserModel.findOne(user.id,{
    password:data.password
 },{
    returnDocument:'after'
  }
)
  return updatedPassword
 
    }      
}
