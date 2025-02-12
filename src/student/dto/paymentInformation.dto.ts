import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    paymentMethod:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    subscriptionPlan:string
}

export class UpdatePaymentInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    paymentMethod:string

    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    subscriptionPlan:string
}