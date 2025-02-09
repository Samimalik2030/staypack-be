import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty} from 'class-validator';
import { IsString } from 'class-validator';


export class SignInDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

}
