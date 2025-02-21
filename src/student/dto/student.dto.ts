import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GenderType } from "../types";

export class CreateStudentDTO{
     @ApiProperty({type:String,default:true,example:"2025-02-13T12:00:00.000Z"})
        @IsNotEmpty()
        dateOfBirth:String
    
        @ApiProperty({enum:GenderType,default:true})
        @IsEnum(GenderType)
        @IsNotEmpty()
        gender:GenderType
}

