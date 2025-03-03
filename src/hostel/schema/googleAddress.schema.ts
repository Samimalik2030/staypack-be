import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema({_id:false})
export class GoogleAddress {
    
    @Prop({ type: String, required: true })
    @ApiProperty({ type: String, example: "San Francisco", default: "San Francisco" })
    @IsString()
    city: string;

    @Prop({ type: String, required: true })
    @ApiProperty({ type: String, example: "Downtown", default: "Downtown" })
    @IsString()
    area: string;

    @ApiProperty({ type: Number, example: 37.7749, default: 37.7749, description: "Latitude (-90 to 90)" })
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @ApiProperty({ type: Number, example: -122.4194, default: -122.4194, description: "Longitude (-180 to 180)" })
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;
}

export const GoogleAddressMongoSchema = MongoFactory.createSchema(GoogleAddress);
