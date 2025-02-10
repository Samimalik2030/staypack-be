import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

    @ApiProperty({ example: '545748' })
    @IsNotEmpty()
    @IsNumber()
    otp: number
}