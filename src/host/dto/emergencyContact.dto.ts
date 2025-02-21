import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmergencyContactDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    emergencyContactName: string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    relationship: string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    contactNumber: string
}