import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePropertyDto {
  @ApiProperty({ example: 'Modern Family House', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'House', required: false })
  @IsOptional()
  type?: string;

  @ApiProperty({ example: 'France', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Normandy', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: 'Rouen', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Downtown', required: false })
  @IsString()
  @IsOptional()
  location?: string;

   @ApiProperty({ type: Number ,example:23,required:false})
   @IsNumber()
   @IsOptional()
   latitude?: Number;
  
    @ApiProperty({ type: Number,example:46,required:false })
    @IsNumber()
    @IsOptional()
    longitude?: Number;

  @ApiProperty({ example: 'sqft', required: false })
  @IsString()
  @IsOptional()
  areaUnit?: string;

  @ApiProperty({ example: 20, required: false })
  @IsNumber()
  @IsOptional()
  propertySize?: number;

  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 500000, required: false })
  @IsNumber()
  @IsOptional()
  rent?: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsOptional()
  bedrooms?: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsOptional()
  kitchen?: number;

  @ApiProperty({ example: 'Yes' })
  @IsOptional()
  garage?: string;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  bathrooms?: number;

  @ApiProperty({
    example: 'A spacious and modern house with a beautiful garden.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'New', required: false })
  @IsString()
  @IsOptional()
  condition?: string;
}
