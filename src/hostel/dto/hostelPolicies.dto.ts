import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseSchema } from "src/app/decorators/base.schema";

export class UpdateHostelPoliciesDTO {
    @ApiProperty({type:String,default:null})
    @IsString()
    entryTime:string

    @ApiProperty({type:String,default:null})
    @IsString()
    exitTime:string

}