import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PhotoIdsDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  ids: string[];
}
