import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

MongoSchema()
export class PlatformAccountSetup extends BaseSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    userName:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    password:string
}
export const PlatformAccountSetupMongoSchema = MongoFactory.createSchema(PlatformAccountSetup)