import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBankingInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    bankAccount:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    accountHolderName:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    bankName:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    accountNumber:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    code:string
}