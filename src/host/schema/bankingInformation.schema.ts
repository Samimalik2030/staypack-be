import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class BankingInformation extends BaseSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    bankAccount:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    accountHolderName:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    bankName:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    accountNumber:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    code:string
}
export const BankingInformationMongoSchema = MongoFactory.createSchema(BankingInformation)