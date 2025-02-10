import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber,  } from "class-validator";
import { OtpType } from "src/otp/types";

export class verifyOTPDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '545748' })
  @IsNotEmpty()
  @IsNumber()
  otp: number

  
  @ApiProperty({enum:OtpType })
  @IsNotEmpty()
  type: OtpType
}