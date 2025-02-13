import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class EducationalInformationSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    collegeName:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    degreeProgrmme:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    yearOfStudy:string
}
export const educationalInformationMongoSchema = MongoFactory.createSchema(EducationalInformationSchema)