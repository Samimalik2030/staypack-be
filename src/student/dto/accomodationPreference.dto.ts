import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccomodationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    type:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    location:string

    @ApiProperty({type:Number,default:null})
    @IsString()
    @IsNumber()
    budgetRange:number

    
    @ApiProperty({type:Date,default:null})
    @IsDate()
    @IsNotEmpty()
    dateIn:Date

    @ApiProperty({type:Date,default:null})
    @IsDate()
    @IsNotEmpty()
    dateOut:Date
}
export class UpdateAccomodationPreferenceDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    type:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    location:string

    @ApiProperty({type:Number,default:null})
    @IsString()
    @IsNumber()
    budgetRange:number

    
    @ApiProperty({type:Date,default:null})
    @IsDate()
    @IsNotEmpty()
    dateIn:Date

    @ApiProperty({type:Date,default:null})
    @IsDate()
    @IsNotEmpty()
    dateOut:Date
}