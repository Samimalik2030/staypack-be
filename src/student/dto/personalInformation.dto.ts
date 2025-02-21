import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GenderType } from "../types";


export class UpdatePersonalInformationDTO {
    @ApiProperty({ type: String, default: "John" }) // Default value: A sample first name
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @ApiProperty({ type: String, default: "Doe" }) // Default value: A sample last name
    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @ApiProperty({ type: String, default: "john.doe@example.com" }) // Default value: A sample email
    @IsString()
    @IsNotEmpty()
    emailName: string;
  
    @ApiProperty({ type: String, default: "+1234567890" }) // Default value: A sample phone number
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
  
    @ApiProperty({ type: Date, default: new Date("1990-01-01") }) // Default value: A sample date of birth
    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date;
  
    @ApiProperty({ enum: GenderType, default: GenderType.FEMALE }) // Default value: Male (update based on your enum)
    @IsEnum(GenderType)
    @IsNotEmpty()
    gender: GenderType;
  
    @ApiProperty({ type: String, default: "https://example.com/default-profile-pic.jpg" }) // Default value: A sample profile picture URL
    @IsString()
    @IsNotEmpty()
    profilePicture: string;
  }

