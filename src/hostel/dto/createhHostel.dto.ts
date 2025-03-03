import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { HostelType } from "../types";
import { Type } from "class-transformer";
import { UpdateAdressDTO } from "./google-address.dto";

export class CreateHostelDTO {
    @ApiProperty({ type: String, example: "Sunny Hostel", required: true })
    @IsString()
    name: string;

    @ApiProperty({
        type:UpdateAdressDTO,
        required: true,
        example: UpdateAdressDTO
    })
    @ValidateNested()
    @Type(() => UpdateAdressDTO)
    address: UpdateAdressDTO;

    @ApiProperty({ enum: HostelType, example: HostelType.BOYS, required: true })
    @IsEnum(HostelType)
    type: HostelType;
}
