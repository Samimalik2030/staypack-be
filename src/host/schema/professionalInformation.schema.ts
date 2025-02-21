import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { HostingType } from "../types";
import { IsEnum } from "class-validator";

@MongoSchema({_id:false})
export class professionalInformation extends BaseSchema{
    @Prop({enum:HostingType,required:true})
    @IsEnum(HostingType)
    hostingType:HostingType

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    businessName:string
}
export const PersonalInformationMongoSchema = MongoFactory.createSchema(professionalInformation)