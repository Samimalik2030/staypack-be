import { Module } from '@nestjs/common';
import { HostController } from './controller/host.controller';
import { HostService } from './service/host.service';
import { TokenService } from 'src/jwt/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { Host, HostSchema } from './schema/host.mongo';

@Module({
    imports: [MongooseModule.forFeature([{ name: Host.name, schema: HostSchema}]),UserModule],
    controllers:[HostController],
    providers:[HostService,TokenService]
})
export class HostModule{}
      

