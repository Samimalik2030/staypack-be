import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class identificationAndVerification extends BaseSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    studentID:string

    @Prop({type:Number,required:true})
    @ApiProperty({type:Number})
    nationalID:number
}
export const identificationAndVerificationMongoSchema = MongoFactory.createSchema(identificationAndVerification)