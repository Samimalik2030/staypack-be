import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePlatformAccountSetupDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    userName:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    password:string
}