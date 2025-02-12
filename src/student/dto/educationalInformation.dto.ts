import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEducationalInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
   collegeName:string

   @ApiProperty({type:String,default:null})
   @IsString()
   @IsNotEmpty()
   degreeProgramme:string

   @ApiProperty({type:String,default:null})
   @IsString()
   @IsNotEmpty()
   yearOfStudy:string
}
   export class UpdateEducationalInformationDTO{
    @ApiProperty({type:String,default:null})
    @IsString()
    @IsNotEmpty()
   collegeName:string

   @ApiProperty({type:String,default:null})
   @IsString()
   @IsNotEmpty()
   degreeProgramme:string

   @ApiProperty({type:String,default:null})
   @IsString()
   @IsNotEmpty()
   yearOfStudy:string
}