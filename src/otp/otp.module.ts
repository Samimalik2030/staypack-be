import { Module } from '@nestjs/common';
import { OtpService } from './service/otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, OtpSchema } from './schema/otp.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:OTP.name,schema:OtpSchema}])
  ],
  providers: [OtpService],
  exports:[OtpService]
})
export class OtpModule {}
