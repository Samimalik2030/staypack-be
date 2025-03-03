import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { OtpService } from 'src/otp/service/otp.service';
import { OtpType } from 'src/otp/types';
import { verifyOTPDto } from '../dto/verify-otp.dto';
import { JwtTokenService } from 'src/jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly jwtTokenService: JwtTokenService,
    private readonly otpService: OtpService


  ) { }

  async filter(data:Partial<User>):Promise<User[]> {
    return await this.UserModel.find(data)
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({
      email: email
    })
  }
  async findOne(data: Partial<User>) {
    return await this.UserModel.findOne(data)
  }

  async signUp(data: SignUpDto) {
    const createdUser = await this.UserModel.create(data)
    console.log(createdUser,'createdUser')
    const token = await this.jwtTokenService.generateToken({
      email: createdUser.email,
      id: createdUser._id,
      role: createdUser.role
    })
    return {
      token: token,
      user: createdUser
    }
  }

  async signIn(data: SignInDto) {
    const user = await this.UserModel.findOne({
      email: data.email,
      password: data.password
    })
    console.log(user,'user')
    if (!user) {
      throw new NotFoundException('invalid credantial')
    }
    const token = await this.jwtTokenService.generateToken({
      email: user.email,
      id: user._id,
      role: user.role
    })
    return {
      token: token,
      user: user
    }
  }

  async forgotPassword(data: forgotPasswordDto) {
    const user = await this.UserModel.findOne({
      email: data.email
    })
    if (!user) {
      throw new NotFoundException('user not found')
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    await this.otpService.storeOtp({
      otp: otp,
      type: OtpType.FORGOT_PASSWORD,
      user: user
    })
    return {
      message: `Otp sent to your email.Please use this otp ${otp}`
    }
  }




  async updatePassword(id: string, password: string, confirmPassword: string) {

    const updatedPassword = await this.UserModel.findByIdAndUpdate(id, {
      password: password,
      confirmPassword: confirmPassword
    }, {
      returnDocument: 'after'
    }
    )
    return updatedPassword

  }



  async delete(id:string){
    const deletedUser = await this.UserModel.findByIdAndDelete(id)
    return deletedUser
  }
  async getUser(id:string){
    const foundedUser = await this.UserModel.findById(id)
    return foundedUser
  }
async update(id:string,data:Partial<User>):Promise<User>{
  const updatedUser = await this.UserModel.findByIdAndUpdate(id,data,{
    returnDocument:'after'
  })
  if(!updatedUser){
    throw new NotFoundException('User not found')
  }
  return updatedUser
}


async deleteHost(id:string){
  const deletedHost = await this.UserModel.findByIdAndDelete(id)
  return deletedHost
// }

// async updateHost(id:string,data:Partial<Host>){
//   const updatedUser = await this.UserModel.findByIdAndUpdate(id,data,{
//     returnDocument:'after'
//   })
//   return updatedUser
// }
}
}
