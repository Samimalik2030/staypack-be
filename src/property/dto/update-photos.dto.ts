import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhotosDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  photos: Express.Multer.File[];
}
