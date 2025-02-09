import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/jwt/jwt.service';
@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    JwtModule.register({
      global: true,
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '1d',
        audience: 'www.tn-nest.com',
        issuer: 'www.tn-nest.com',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,TokenService]
})
export class UserModule {}
