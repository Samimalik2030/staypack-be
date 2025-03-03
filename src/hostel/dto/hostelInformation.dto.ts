import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { HostelType } from "../types";
import { Schema } from "mongoose";
import { GoogleAddress } from "../schema/googleAddress.schema";
import { Type } from "class-transformer";

export class UpdateHostelInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    hoetelName:string

    @ApiProperty({type:GoogleAddress,default:null})
    @ValidateNested()
    @Type(()=>GoogleAddress)
    address:GoogleAddress

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