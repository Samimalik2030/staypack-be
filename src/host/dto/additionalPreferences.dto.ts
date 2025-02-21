
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PreferredCommunicationChannel } from "../types";

export class UpdateAdditionalPreferencesDTO{
    @ApiProperty({enum:PreferredCommunicationChannel,default:null})
    @IsEnum(PreferredCommunicationChannel)
    @IsNotEmpty()
    preferencesCommunicationChannel:PreferredCommunicationChannel

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    availability:string
}