import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class AccomodationPreference extends BaseSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    type:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    location:string

    @Prop({type:Number,required:true})
    @ApiProperty({type:Number})
    budgetRange:number

    @Prop({type:Date,required:true})
    @ApiProperty({type:Date})
    dateIn:Date

    @Prop({type:Date,required:true})
    @ApiProperty({type:Date})
    dateOut:Date
}
export const AccomodationPreferenceMongoSchema = MongoFactory.createSchema(AccomodationPreference)
