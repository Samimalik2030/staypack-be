import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class EmergencyContact extends BaseSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    name:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    relationShip:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    phoneNumber:string
}
export const emergencyContactMongoSchema= MongoFactory.createSchema(EmergencyContact)