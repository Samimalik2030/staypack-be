import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateFoodPreferenceDTO {
    @ApiProperty({ type: String, default: "Standard Meal Plan" }) // Default value: A common meal plan
    @IsString()
    @IsNotEmpty()
    mealPlan: string;
  
    @ApiProperty({ type: [String], default: ["None"] }) // Default value: No dietary restrictions
    @IsArray()
    @IsNotEmpty()
    dietaryRestriction: string[];
  }