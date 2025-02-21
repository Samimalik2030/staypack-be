import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { LaundryPlan } from "../types";
import { BaseSchema } from "src/app/decorators/base.schema";

@MongoSchema()
export class LaundryPreference extends BaseSchema{
    @Prop({enum:LaundryPlan,required:true})
    @ApiProperty({enum:LaundryPlan})
    laundryPlan:LaundryPlan

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    request:string
}
export const laundryPreferenceMongoSchema = MongoFactory.createSchema(LaundryPreference)