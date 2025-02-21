import { Prop } from "@nestjs/mongoose";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { AdditionalPreferences } from "./additionalPreferences.schema";
import { ApiProperty } from "@nestjs/swagger";
import { BankingInformation } from "./bankingInformation.schema";
import { EmergencyContact } from "./emergencyContact.schema";
import { IdentificationDetail } from "./identificationDetail.schema";
import { personalInformation } from "./personalInformation.schema";
import { PlatformAccountSetup } from "./platformAccountSetup.schema";
import { professionalInformation } from "./professionalInformation.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { Schema } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { transformObjectId } from "src/app/decorators/objectToId";
import { Transform } from "class-transformer";

@MongoSchema()
export class Host extends BaseSchema {

    @Prop({ type: personalInformation,default:null })
    @ApiProperty({ type: () => personalInformation })
    personalInformation: personalInformation;


    @Prop({ type: AdditionalPreferences, default: null })
    @ApiProperty({ type: () => AdditionalPreferences })
    additionalPreferences: AdditionalPreferences;

    @Prop({ type: BankingInformation,default:null })
    @ApiProperty({ type: () => BankingInformation })
    bankingInformation: BankingInformation;

    @Prop({ type: EmergencyContact,default:null })
    @ApiProperty({ type: () => EmergencyContact })
    emergencyContact: EmergencyContact;

    @Prop({ type: IdentificationDetail,default:null })
    @ApiProperty({ type: () => IdentificationDetail })
    identificationDetail: IdentificationDetail;

  
    @Prop({ type: PlatformAccountSetup,default:null })
    @ApiProperty({ type: () => PlatformAccountSetup })
    platformAccountSetup: PlatformAccountSetup;

    @Prop({ type: professionalInformation,default:null })
    @ApiProperty({ type: () => professionalInformation })
    professionalInformation: professionalInformation;

    @Prop({
        type: String,
        enum: ['Draft', 'Active', 'Pending'],
        default: 'Draft',
    })
    @ApiProperty({ type: String, enum: ['Draft', 'Active', 'Pending'] })
    status: string;

    @ApiProperty({ type: String })
    @Prop({ type: Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const HostSchema = MongoFactory.createSchema(Host);
