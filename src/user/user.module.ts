import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

import { OtpModule } from 'src/otp/otp.module';
import { JwtTokenService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1h',
        audience: process.env.DOMAIN,
        issuer: process.env.DOMAIN,
      },
    }),
    OtpModule,
    ConfigModule
    
  ],
  controllers: [UserController],
  providers: [UserService,JwtTokenService],
  exports: [UserService],
})
export class UserModule {}
