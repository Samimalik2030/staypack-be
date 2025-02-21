import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateHostDTO{
 @ApiProperty({type:String,default:null,example:'1,3,4,5'})
    @IsString()
    @IsNotEmpty()
    number:string

    @ApiProperty({type:String,default:null,example:'Multan'})
    @IsString()
    @IsNotEmpty()
    address:string
} 