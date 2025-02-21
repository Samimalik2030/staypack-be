import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIdentificationDetailDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    governmentIssuedID:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
   identificationNumber:string
}
