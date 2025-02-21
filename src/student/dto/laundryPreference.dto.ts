import { ApiProperty } from "@nestjs/swagger";
import { LaundryPlan } from "../types";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateLaundryPreferenceDTO {
    @ApiProperty({ enum: LaundryPlan, default: LaundryPlan.BIWEEKLY}) // Default value: Basic plan from the enum
    @IsEnum(LaundryPlan)
    @IsNotEmpty()
    laundryPlan: LaundryPlan;
  
    @ApiProperty({ type: String, default: "Wash and fold required by next day" }) // Default: A typical request
    @IsString()
    @IsNotEmpty()
    request: string;
  }