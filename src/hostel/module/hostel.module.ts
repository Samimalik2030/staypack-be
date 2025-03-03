import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hostel, HostelSchema } from '../schema/hostel.mongo';
import { UserModule } from 'src/user/user.module';
import { HostelController } from '../controller/hostel.controller';
import { HostelService } from '../service/hostel.service';
import { JwtTokenService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { HostService } from 'src/host/service/host.service';
import { HostModule } from 'src/host/host.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Hostel.name, schema: HostelSchema}]),UserModule,ConfigModule ,HostModule],
  controllers: [HostelController],
  providers: [HostelService,JwtTokenService],
})
export class HostelModule {}
