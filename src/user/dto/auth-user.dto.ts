import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class AuthUserDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
