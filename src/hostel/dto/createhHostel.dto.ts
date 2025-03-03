import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { HostelType } from "../types";
import { GoogleAddress } from "../schema/googleAddress.schema";
import { Type } from "class-transformer";
import { UpdateGoogleAddressDTO } from "./google-address.dto";

export class CreateHostelDTO {
    @ApiProperty({ type: String, example: "Sunny Hostel", required: true })
    @IsString()
    name: string;

    @ApiProperty({
        type:UpdateGoogleAddressDTO,
        required: true,
        example: UpdateGoogleAddressDTO
    })
    @ValidateNested()
    @Type(() => UpdateGoogleAddressDTO)
    address: UpdateGoogleAddressDTO;

    @ApiProperty({ enum: HostelType, example: HostelType.BOYS, required: true })
    @IsEnum(HostelType)
    type: HostelType;
}
