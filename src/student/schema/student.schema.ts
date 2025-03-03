import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";




@MongoSchema()
export class EducationalInformationSchema {
    
    @Prop({ type: String })
    firstName: string;
    
    @Prop({ type: String, required: true })
    @ApiProperty({ type: String })
    lastName: string;
}


const educationalInformationSchema = MongoFactory.createSchema(EducationalInformationSchema);


