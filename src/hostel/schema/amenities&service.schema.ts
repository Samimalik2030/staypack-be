import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class EmenitiesAndService{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    utilitiesIncluded:string[]

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    foodAvailability:boolean

    @Prop({type:Boolean,required:true})
    @ApiProperty({type:Boolean})
    laundryService:boolean

    @Prop({type:String,required:true})
    @ApiProperty({type:Boolean})
    cleaningService:boolean

    @Prop({type:Boolean,required:true})
    @ApiProperty({type:Boolean})
    parkingAvailability:boolean
}
export const EmenitiesAndServiceMongoSchema = MongoFactory.createSchema(EmenitiesAndService)