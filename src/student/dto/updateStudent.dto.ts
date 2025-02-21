import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { UpdatePersonalInformationDTO } from "./personalInformation.dto";
import { UpdateEducationalInformationDTO } from "./educationalInformation.dto";
import { UpdateEmergencyContactDTO } from "./emergencyContact.dto";
import { UpdateFoodPreferenceDTO } from "./foodPreference.dto";
import { UpdateIdentificationAndVerificationDTO } from "./identificationAndVerification.dto";
import { UpdateLaundryPreferenceDTO } from "./laundryPreference.dto";
import { UpdatePaymentInformationDTO } from "./paymentInformation.dto";
import { UpdateAccomodationPreferenceDTO } from "./accomodationPreference.dto";

export class UpdateStudentDTO {
  @ApiProperty({ type: UpdateAccomodationPreferenceDTO, required: false })
  @IsOptional()
  accomodationPreference?: UpdateAccomodationPreferenceDTO;

  @ApiProperty({ type: UpdateEducationalInformationDTO, required: false })
  @IsOptional()
  educationalInformation?: UpdateEducationalInformationDTO;

  @ApiProperty({ type: UpdateEmergencyContactDTO, required: false })
  @IsOptional()
  emergencyContact?: UpdateEmergencyContactDTO;

  @ApiProperty({ type: UpdateFoodPreferenceDTO, required: false })
  @IsOptional()
  foodPreference?: UpdateFoodPreferenceDTO;

  @ApiProperty({ type: UpdateIdentificationAndVerificationDTO, required: false })
  @IsOptional()
  identificationAndVerification?: UpdateIdentificationAndVerificationDTO;

  @ApiProperty({ type: UpdateLaundryPreferenceDTO, required: false })
  @IsOptional()
  laundryPreference?: UpdateLaundryPreferenceDTO;

  @ApiProperty({ type: UpdatePaymentInformationDTO, required: false })
  @IsOptional()
  paymentInformation?: UpdatePaymentInformationDTO;

  @ApiProperty({ type: UpdatePersonalInformationDTO, required: false })
  @IsOptional()
  personalInformation?: UpdatePersonalInformationDTO;
}
