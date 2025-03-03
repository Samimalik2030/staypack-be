import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@Schema({_id:false})
export class HostelPolicies{
    @ApiProperty({type:String,required:true})
    @Prop({type:String})
    entryTime:string

    @ApiProperty({type:String,required:true})
    @Prop({type:String})
    exitTime:string
}
export const hostelPoliciesMongoSchema = MongoFactory.createSchema(HostelPolicies)