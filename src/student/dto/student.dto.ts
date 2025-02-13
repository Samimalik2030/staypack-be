import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GenderType } from "../types";

export class CreateStudentDTO{
     @ApiProperty({type:Date,default:null})
        @IsDate()
        @IsNotEmpty()
        dateOfBirth:Date
    
        @ApiProperty({enum:GenderType,default:null})
        @IsEnum(GenderType)
        @IsNotEmpty()
        gender:GenderType
}
export class UpdateStudentDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    firstName:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    lastName:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    emailName:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    phoneNumber:string

    @ApiProperty({type:Date,default:null})
    @IsDate()
    @IsNotEmpty()
    dateOfBirth:Date

    @ApiProperty({enum:GenderType,default:null})
    @IsEnum(GenderType)
    @IsNotEmpty()
    gender:GenderType

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    profilePicture:string
}