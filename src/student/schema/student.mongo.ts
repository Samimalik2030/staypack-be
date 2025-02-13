import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "src/app/decorators/base.schema";
import { MongoFactory } from "src/app/decorators/mongo-factory";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { PersonalInformationMongoSchema, PersonalInformationSchema } from "./personal-information.mongo";
import { EducationalInformationSchema } from "../student.schema";
import { AccomodationPreferenceMongoSchema, AccomodationPreferenceSchema } from "./accomodationPreference.schema";
import { foodPreferenceMongoSchema, FoodPreferenceSchema } from "./foodPreference.schema";
import { laundryPreferenceMongoSchema, LaundryPreferenceSchema } from "./laundryPreference.schema";
import { emergencyContactMongoSchema, EmergencyContactSchema } from "./emergencyContact.schema";
import { identificationAndVerificationMongoSchema, IdentificationAndVerificationSchema } from "./identificationAndVerification.schema";
import { paymentInformationMongoSchema, PaymentInformationSchema } from "./paymentInformation.schema";


@MongoSchema()
export class Student extends BaseSchema {

    @Prop({ type: PersonalInformationMongoSchema }) 
    @ApiProperty({ type: () => PersonalInformationSchema })
    personalInformation: PersonalInformationSchema;


    @Prop({ type: EducationalInformationSchema }) 
    @ApiProperty({ type: () =>EducationalInformationSchema })
    eudcationalInformation: EducationalInformationSchema;

    @Prop({ type: AccomodationPreferenceMongoSchema }) 
    @ApiProperty({ type: () => AccomodationPreferenceSchema })
   accomodationPreference: AccomodationPreferenceSchema;

   @Prop({ type: foodPreferenceMongoSchema}) 
    @ApiProperty({ type: () => FoodPreferenceSchema })
   foodPreference:FoodPreferenceSchema;

   @Prop({ type: laundryPreferenceMongoSchema}) 
    @ApiProperty({ type: () => LaundryPreferenceSchema })
    laundryPreference:LaundryPreferenceSchema;

    @Prop({ type: emergencyContactMongoSchema}) 
    @ApiProperty({ type: () => EmergencyContactSchema })
   emergencyContact:EmergencyContactSchema;

   @Prop({ type: identificationAndVerificationMongoSchema}) 
   @ApiProperty({ type: () => IdentificationAndVerificationSchema })
  identificationAndVerification:IdentificationAndVerificationSchema;

  @Prop({ type: paymentInformationMongoSchema}) 
   @ApiProperty({ type: () => PaymentInformationSchema})
  paymentInformation:PaymentInformationSchema
}


export const studentSchema = MongoFactory.createSchema(Student);