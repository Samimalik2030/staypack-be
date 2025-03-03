import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseSchema } from "src/app/decorators/base.schema";
import { transformObjectId } from "src/app/decorators/objectToId";
import { AdditionalPreferences } from "./additionalPreferences.schema";
import { BankingInformation } from "./bankingInformation.schema";
import { EmergencyContact } from "./emergencyContact.schema";
import { IdentificationDetail } from "./identificationDetail.schema";

import { Schema } from "mongoose";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { User } from "src/user/schema/user.schema";
import { MongoSchema } from "src/app/decorators/mongo.schema";

@MongoSchema()
export class Host extends BaseSchema {
    @Prop({ type: AdditionalPreferences })
    @ApiProperty({ type: () => AdditionalPreferences })
    additionalPreferences: AdditionalPreferences;

    @Prop({ type: BankingInformation })
    @ApiProperty({ type: () => BankingInformation })
    bankingInformation: BankingInformation;

    @Prop({ type: EmergencyContact })
    @ApiProperty({ type: () => EmergencyContact })
    emergencyContact: EmergencyContact;

    @Prop({ type: IdentificationDetail })
    @ApiProperty({ type: () => IdentificationDetail })
    identificationDetail: IdentificationDetail;

    @Prop({ type: Schema.Types.ObjectId, ref: "User" })
    @ApiProperty({ type: Host })
    @Transform(transformObjectId)
    user: User

    @Prop({ type: String, default: "Draft" })
    @ApiProperty({ type: String })
    status: String;
}
export const HostSchema = MongoFactory.createSchema(Host)