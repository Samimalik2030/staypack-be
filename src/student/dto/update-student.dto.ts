import { ApiProperty } from "@nestjs/swagger";
import { GenderType, LaundryPlan } from "../types";
import { IsEnum, IsString } from "class-validator";
import { Schema } from "@nestjs/mongoose";

export class StudentQueryDTO {
    @ApiProperty({ enum: GenderType })
    @IsEnum(GenderType)
    gender: GenderType


    @ApiProperty({ type: String, example: 'Ali' })
    @IsString()
    name: string


    
    @ApiProperty({ enum:LaundryPlan, example: LaundryPlan.WEEKLY })
    @IsEnum(LaundryPlan)
    laundryPlan:LaundryPlan

    
    @ApiProperty({ type: String, example: 'any' })
    @IsString()
    collegeName:string


    @ApiProperty({ type: String, example: '1234' })
    @IsString()
   nationalId: string


   
   @ApiProperty({ type: String, example: '5000' })
   @IsString()
  paynentMethod: string
}