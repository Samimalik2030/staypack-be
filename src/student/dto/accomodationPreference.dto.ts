import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class UpdateAccomodationPreferenceDTO {
  @ApiProperty({ type: String, default: "Shared" }) // Default value: Shared accommodation type
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: String, default: "City Center" }) // Default value: City Center
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ type: Number, default: 5000 }) // Default value: 5000
  @IsNumber()
  @IsNotEmpty()
  budgetRange: number;

  @ApiProperty({ type: String, default: new Date(new Date().setDate(new Date().getDate() + 7)) }) // Default: 7 days from now
  @IsNotEmpty()
  dateIn: String;

  @ApiProperty({ type: Date, default: new Date(new Date().setDate(new Date().getDate() + 30)) }) // Default: 30 days from now
  @IsDate()
  @IsNotEmpty()
  dateOut: Date;
}
