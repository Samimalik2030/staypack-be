import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty()
  fileId: string;

  @ApiProperty()
  url: string;
}
