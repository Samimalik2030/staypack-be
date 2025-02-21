import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class IdentificationDetail{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    governmentIssuedID:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
     identificationNumber:string
}
export const IdentificationDetailMongoSchema = MongoFactory.createSchema(IdentificationDetail)