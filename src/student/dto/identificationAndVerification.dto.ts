import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateIdentificationAndVerificationDTO {
    @ApiProperty({ type: String, default: "STU123456" }) // Default value: A sample student ID
    @IsString()
    @IsNotEmpty()
    studentID: string;
  
    @ApiProperty({ type: Number, default: 1234567890 }) // Default value: A sample national ID
    @IsNumber()
    @IsNotEmpty()
    nationalID: number; // Fixed type to match @IsNumber decorator
  }