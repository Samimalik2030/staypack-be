import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FileDto{
    @ApiProperty({type:String,required:true})
    @IsString()
    fileName:string

    @ApiProperty({type:String,required:true})
    @IsString()
    fileId:string
}