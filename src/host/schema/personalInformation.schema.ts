import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema({_id:false})
export class personalInformation{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    number:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    address:string
}
export const PersonalInformationMongoSchema = MongoFactory.createSchema(personalInformation)