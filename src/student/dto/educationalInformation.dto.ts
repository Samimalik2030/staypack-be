import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class UpdateEducationalInformationDTO {
   @ApiProperty({ type: String, default: "XYZ University" }) // Default value: A sample university name
   @IsString()
   @IsNotEmpty()
   collegeName: string;
 
   @ApiProperty({ type: String, default: "Computer Science" }) // Default value: A common degree program
   @IsString()
   @IsNotEmpty()
   degreeProgramme: string;
 
   @ApiProperty({ type: String, default: "2nd Year" }) // Default value: A realistic year of study
   @IsString()
   @IsNotEmpty()
   yearOfStudy: string;
 }