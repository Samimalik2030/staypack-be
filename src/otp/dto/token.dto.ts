import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/user/schema/user.schema";

export class CreateTokenDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    type:string

    @ApiProperty({type:Number,default:null})
    @IsNumber()
    @IsNotEmpty()
    otp:number

    @ApiProperty({type:User,default:null})
    @IsNotEmpty()
    user:User
}

export class UpdateTokenDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    type:string

    @ApiProperty({type:Number,default:null})
    @IsNumber()
    @IsNotEmpty()
    otp:number
}