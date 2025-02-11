import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { Schema as MongooseSchema } from "mongoose";

@Schema()
export class PersonalInformationSchema {
    
    @Prop({ type: String })
    firstName: string;
    
    @Prop({ type: String, required: true })
    @ApiProperty({ type: String })
    lastName: string;
}


const PersonalInformationMongoSchema = MongoFactory.createSchema(PersonalInformationSchema);

@MongoSchema()
export class Student extends BaseSchema {

    @Prop({ type: PersonalInformationMongoSchema }) 
    @ApiProperty({ type: () => PersonalInformationSchema })
    personalInformation: PersonalInformationSchema;
}


export const studentSchema = MongoFactory.createSchema(Student);
