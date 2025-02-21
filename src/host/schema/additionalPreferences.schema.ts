import { Prop } from "@nestjs/mongoose";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { PreferredCommunicationChannel } from "../types";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";

MongoSchema({_id:false})
export class AdditionalPreferences{
    @Prop({enum:PreferredCommunicationChannel,required:true})
    @ApiProperty({enum:PreferredCommunicationChannel})
    additionalPreferences:PreferredCommunicationChannel

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    availability:string
}
export const AdditionalPreferencesMongoSchema = MongoFactory.createSchema(AdditionalPreferences)