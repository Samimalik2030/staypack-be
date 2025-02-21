import { ApiProperty } from "@nestjs/swagger";
import { GenderType } from "../types";
import { IsEnum, IsString } from "class-validator";

export class StudentQueryDTO {
    @ApiProperty({ enum: GenderType })
    @IsEnum(GenderType)
    gender: GenderType


    @ApiProperty({ type: String, example: 'Ali' })
    @IsString()
    name: string
}