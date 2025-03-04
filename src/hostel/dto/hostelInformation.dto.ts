import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { HostelType } from "../types";
import { Schema } from "mongoose";
import { Type } from "class-transformer";
import { Address } from "../schema/address.schema";

export class UpdateHostelInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    hoetelName:string

    @ApiProperty({type:Address,default:null})
    @ValidateNested()
    @Type(()=>Address)
    address:Address

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