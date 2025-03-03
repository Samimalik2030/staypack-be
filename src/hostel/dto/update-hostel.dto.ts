import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { UpdateAnemitiesAndServiceDTO } from "./anemitiesAndService.dto";
import { UpdateGoogleAddressDTO } from "./google-address.dto";
import { UpdateHostelPoliciesDTO } from "./hostelPolicies.dto";
import { UpdateHostelInformationDTO } from "./hostelInformation.dto";
import { Type } from "class-transformer";

export class UpdateHostelDTO {
  @ApiProperty({ type: UpdateAnemitiesAndServiceDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAnemitiesAndServiceDTO) 
  anemitiesAndService?: UpdateAnemitiesAndServiceDTO;

  @ApiProperty({ type: UpdateGoogleAddressDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateGoogleAddressDTO)
  googleAddress?: UpdateGoogleAddressDTO;

  @ApiProperty({ type: UpdateHostelInformationDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHostelInformationDTO)
  hostelInformation?: UpdateHostelInformationDTO;

  @ApiProperty({ type: UpdateHostelPoliciesDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHostelPoliciesDTO)
  hostelPolicies?: UpdateHostelPoliciesDTO;
}
