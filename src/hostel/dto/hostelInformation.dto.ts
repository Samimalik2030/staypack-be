import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { HostelType } from "../types";
import { Schema } from "mongoose";
import { Type } from "class-transformer";
import { Adress } from "../schema/googleAddress.schema";

export class UpdateHostelInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    hoetelName:string

    @ApiProperty({type:Adress,default:null})
    @ValidateNested()
    @Type(()=>Adress)
    address:Adress

    @ApiProperty({type:String,default:null})
    @IsString()
    city:string

    @ApiProperty({type:String,default:null})
    @IsString()
    area:string

    @ApiProperty({enum:HostelType,default:null})
    @IsEnum(HostelType)
    hostelTypeS:HostelType

}