import { ApiProperty } from "@nestjs/swagger";
import { AdditionalPreferences } from "../schema/additionalPreferences.schema";
import { IsOptional } from "class-validator";
import { BankingInformation } from "../schema/bankingInformation.schema";
import { EmergencyContact } from "../schema/emergencyContact.schema";
import { IdentificationDetail } from "../schema/identificationDetail.schema";
import { personalInformation } from "../schema/personalInformation.schema";
import { PlatformAccountSetup } from "../schema/platformAccountSetup.schema";
import { professionalInformation } from "../schema/professionalInformation.schema";

export class UpdateHostDTO{
    @ApiProperty({type:AdditionalPreferences,required:false})
    @IsOptional()
    additionalPreferences:AdditionalPreferences

    @ApiProperty({type:BankingInformation,required:false})
    @IsOptional()
    bankingInformation:BankingInformation

    @ApiProperty({type:EmergencyContact,required:false})
    @IsOptional()
    emergencyContact:EmergencyContact

    @ApiProperty({type:IdentificationDetail,required:false})
    @IsOptional()
   identificationDetail:IdentificationDetail

   @ApiProperty({type:personalInformation,required:false})
   @IsOptional()
   personalInformation:personalInformation

   @ApiProperty({type:PlatformAccountSetup,required:false})
   @IsOptional()
   platformAccountSetup:PlatformAccountSetup

   @ApiProperty({type:professionalInformation,required:false})
   @IsOptional()
   professionalInformation:professionalInformation
}