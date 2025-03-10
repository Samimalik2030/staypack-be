import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { HostelType } from "../types";
import { Address } from "./address.schema";



@Schema({_id:false})
export class HostelInformation{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    name:string

    @Prop({enum:HostelType,required:true})
    @ApiProperty({enum:HostelType,default:null})
    type:HostelType

    @Prop({ type: Address ,default:null})
    @ApiProperty({ type: () => Address })
    address: Address;
}
export const HostelInformationMongoSchema = MongoFactory.createSchema(HostelInformation)