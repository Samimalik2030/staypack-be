import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class FoodPreferenceSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    mealPlan:string

    @Prop({type:[String],required:true})
    @ApiProperty({type:[String]})
    dietaryRestriction:string[]
}
export const foodPreferenceMongoSchema = MongoFactory.createSchema(FoodPreferenceSchema)