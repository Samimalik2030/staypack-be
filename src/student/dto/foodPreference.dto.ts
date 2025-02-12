import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFoodPreferenceDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    mealPlan:string

    @ApiProperty({type:[String],default:null})
    @IsArray()
    @IsNotEmpty()
    dietaryRestriction:string[]
}

export class UpdateFoodPreferenceDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
    mealPlan:string

    @ApiProperty({type:[String],default:null})
    @IsArray()
    @IsNotEmpty()
    dietaryRestriction:string[]
}