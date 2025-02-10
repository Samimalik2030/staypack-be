import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Schema } from "mongoose";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { User } from "src/user/schema/user.schema";
import { OtpType } from "../types";

@MongoSchema()
export class OTP extends BaseSchema {
@Prop({enum:OtpType,required:true})
@ApiProperty({enum:OtpType})
type:OtpType

@Prop({type:Number,required:true})
@ApiProperty({type:Number})
otp:number

@Prop({type:Schema.Types.ObjectId,ref:'User', required:true })
@ApiProperty({type:String})
user:User

}
export const OtpSchema = MongoFactory.createSchema(OTP)
