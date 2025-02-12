import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class PaymentInformationSchema{
    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    paymentMethod:string

    @Prop({type:String,required:true})
    @ApiProperty({type:String})
    subscriptionPlan:string
}
export const paymentInformationMongoSchema = MongoFactory.createSchema(PaymentInformationSchema)