import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDTO, UpdateTokenDTO } from '../../otp/dto/token.dto';
import { OTP } from '../schema/otp.schema';
import { verifyOTPDto } from 'src/user/dto/verify-otp.dto';
import { OtpType } from '../types';
import { User } from 'src/user/schema/user.schema';

@Injectable() 
export class OtpService {
    constructor(@InjectModel(OTP.name) private readonly otpModel:Model<OTP>){}
   
   
  
    async storeOtp(data:CreateTokenDTO){
        return await this.otpModel.create(data)
    }



    async verifyOtp(otp:number,type:OtpType,user:User){
      console.log(otp,type,user)

     const verifiedOtp =  await this.otpModel.findOne({
           otp:otp,
           type:type,
           user:user
           
        }) 
        console.log(verifiedOtp)
        return verifiedOtp   
    }


    async updateOtp(id:string,data:UpdateTokenDTO){
       return await this.otpModel.findByIdAndUpdate(id,data,{
            returnDocument:'after'
        })
    }



    async deleteOtp(id:string){
      return await this.otpModel.findByIdAndDelete(id)
      
    }
}
