import { ApiProperty } from "@nestjs/swagger";
import { LaundryPlan } from "../types";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateLaundryPreferenceDTO{
    @ApiProperty({enum:LaundryPlan,default:null})
    @IsEnum(LaundryPlan)
    @IsNotEmpty()
    laundryPlan:LaundryPlan

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
   request:string
}

export class UpdateLaundryPreferenceDTO{
    @ApiProperty({enum:LaundryPlan,default:null})
    @IsEnum(LaundryPlan)
    @IsNotEmpty()
    laundryPlan:LaundryPlan

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
   request:string
}