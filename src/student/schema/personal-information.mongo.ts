import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { GenderType } from "../types";


MongoSchema()
export class PersonalInformationSchema {

    @Prop({ type: Date, required: true })
    @ApiProperty({ type: Date })
    dateOfBirth: Date;

    @Prop({ enum:GenderType, required: true })
    @ApiProperty({ enum:GenderType })
    gender:GenderType;

 
}
export const PersonalInformationMongoSchema = MongoFactory.createSchema(PersonalInformationSchema);