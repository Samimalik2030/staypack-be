import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { GenderType } from "../types";
import { BaseSchema } from "src/app/decorators/base.schema";
import { User } from "src/user/schema/user.schema";
import { Schema } from "mongoose";


@MongoSchema({_id:false})
export class PersonalInformation extends BaseSchema{

    @Prop({ type: String, required: true})
    @ApiProperty({ type: String })
    dateOfBirth: String;

    @Prop({ enum:GenderType, required:true})
    @ApiProperty({ enum:GenderType })
    gender:GenderType;

 
}
export const PersonalInformationMongoSchema = MongoFactory.createSchema(PersonalInformation);