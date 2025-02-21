import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { PersonalInformation } from "./personal-information.mongo";
import { AccomodationPreference, AccomodationPreferenceMongoSchema, } from "./accomodationPreference.schema";
import { FoodPreference, foodPreferenceMongoSchema, } from "./foodPreference.schema";
import { LaundryPreference, laundryPreferenceMongoSchema, } from "./laundryPreference.schema";
import { EmergencyContact, emergencyContactMongoSchema, } from "./emergencyContact.schema";
import { identificationAndVerification, identificationAndVerificationMongoSchema, } from "./identificationAndVerification.schema";
import { paymentInformation, paymentInformationMongoSchema, } from "./paymentInformation.schema";
import { EducationalInformation, educationalInformationMongoSchema } from "./educationalInformation.schema";
import { Schema } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Transform } from "class-transformer";
import { transformObjectId } from "src/app/decorators/objectToId";


@MongoSchema()
export class Student extends BaseSchema {

    @Prop({ type: PersonalInformation })
    @ApiProperty({ type: () => PersonalInformation })
    personalInformation: PersonalInformation;


    @Prop({ type: EducationalInformation, default: null })
    @ApiProperty({ type: () => EducationalInformation })
    educationalInformation: EducationalInformation;

    @Prop({ type: AccomodationPreference, default: null })
    @ApiProperty({ type: () => AccomodationPreference })
    accomodationPreference: AccomodationPreference;

    @Prop({ type: FoodPreference, default: null })
    @ApiProperty({ type: () => FoodPreference })
    foodPreference: FoodPreference;

    @Prop({ type: LaundryPreference, default: null })
    @ApiProperty({ type: () => LaundryPreference })
    laundryPreference: LaundryPreference;

    @Prop({ type: EmergencyContact, default: null })
    @ApiProperty({ type: () => EmergencyContact })
    emergencyContact: EmergencyContact;

    @Prop({ type: identificationAndVerification, default: null })
    @ApiProperty({ type: () => identificationAndVerification })
    identificationAndVerification: identificationAndVerification;

    @Prop({ type: paymentInformation, default: null })
    @ApiProperty({ type: () => paymentInformation })
    paymentInformation: paymentInformation

    @Prop({ type: Schema.Types.ObjectId, ref: "User" })
    @ApiProperty({ type: User })
    @Transform(transformObjectId)
    user: User

    @Prop({ type: String, default: "Draft" })
    @ApiProperty({ type: String })
    status: String;
}
export const StudentSchema = MongoFactory.createSchema(Student)




















































































































































































































































