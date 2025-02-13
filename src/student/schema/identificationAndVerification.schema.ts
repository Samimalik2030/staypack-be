import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class IdentificationAndVerificationSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    studentID:string

    @Prop({type:Number,required:true})
    @ApiProperty({type:Number})
    nationalID:number
}
export const identificationAndVerificationMongoSchema = MongoFactory.createSchema(IdentificationAndVerificationSchema)