import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProfessionalInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    behalfOfCompany:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    businessName:string
}