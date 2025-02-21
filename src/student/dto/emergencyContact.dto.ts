import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class UpdateEmergencyContactDTO {
    @ApiProperty({ type: String, default: "John Doe" }) // Default value: A sample name
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ type: String, default: "Father" }) // Default value: A common relationship
    @IsString()
    @IsNotEmpty()
    relationship: string;
  
    @ApiProperty({ type: String, default: "+1234567890" }) // Default value: A sample phone number
    @IsString()
    @IsNotEmpty()
    phoneNumber: string; // Corrected spelling from `phoneNuber` to `phoneNumber`
  }