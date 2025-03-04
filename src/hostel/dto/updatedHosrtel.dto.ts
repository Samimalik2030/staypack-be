import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class HostelQueryDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    firstName:string
}