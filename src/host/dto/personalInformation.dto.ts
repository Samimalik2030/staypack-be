import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePersonalInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    number:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    address:string
}