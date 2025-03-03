import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max } from "class-validator";

export class UpdateAdressDTO {
    @ApiProperty({ type: String, example: "San Francisco" })
    @IsString()
    city: string;

    @ApiProperty({ type: String, example: "Downtown"})
    @IsString()
    area: string;

    @ApiProperty({ example: 37.7749, description: "Latitude (-90 to 90)" })
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @ApiProperty({ example: -122.4194, description: "Longitude (-180 to 180)" })
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;
}
