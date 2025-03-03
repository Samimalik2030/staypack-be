import { Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { BaseSchema } from "src/app/decorators/base.schema";

export class UpdateAnemitiesAndServiceDTO {
    @ApiProperty({type:String,default:null})
    @IsString()
    utilitiesIncluded:string[]


    @ApiProperty({type:Boolean,default:null})
    @IsBoolean()
    foodAvailability:boolean

    
    @ApiProperty({type:Boolean,default:null})
    @IsBoolean()
    laundryService:boolean

    
    @ApiProperty({type:Boolean,default:null})
    @IsBoolean()
    cleaningService:boolean

    
    @ApiProperty({type:Boolean,default:null})
    @IsBoolean()
    parkingAvailability:boolean
}