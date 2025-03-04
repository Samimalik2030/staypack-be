import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class DeleteImageDTO {
  @ApiProperty({ example: '675178f9e375273f6050bb36' })
  @IsNotEmpty()
  fileId: string;
}
