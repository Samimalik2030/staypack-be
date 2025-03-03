import { Module } from '@nestjs/common';
import { HostController } from './controller/host.controller';
import { HostService } from './service/host.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { Host, HostSchema } from './schema/host.mongo';
import { JwtTokenService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [MongooseModule.forFeature([{ name: Host.name, schema: HostSchema}]),UserModule,ConfigModule],
    controllers:[HostController],
    providers:[HostService,JwtTokenService],
    exports:[HostService]
})
export class HostModule{}
      

