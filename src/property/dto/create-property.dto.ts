import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreatePropertyDto  {
  @ApiProperty({ example: 'Room' })
  @IsNotEmpty()
  type: string
}
