import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateIdentificationAndVerificationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    studentID:string

    @ApiProperty({type:Number,default:null})
    @IsNumber()
    @IsNotEmpty()
    nationalID:string
}

export class UpdateIdentificationAndVerificationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    studentID:string

    @ApiProperty({type:Number,default:null})
    @IsNumber()
    @IsNotEmpty()
    nationalID:string
}