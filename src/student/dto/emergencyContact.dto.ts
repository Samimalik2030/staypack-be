import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmergencyContactDTO{
@ApiProperty({type:String,default:null})
@IsString()
@IsNotEmpty()
name:string

@ApiProperty({type:String,default:null})
@IsString()
@IsNotEmpty()
relationship:string

@ApiProperty({type:String,default:null})
@IsString()
@IsNotEmpty()
phoneNuber:string
}

export class UpdateEmergencyContactDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    name:string
    
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    relationship:string
    
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    phoneNuber:string
    }