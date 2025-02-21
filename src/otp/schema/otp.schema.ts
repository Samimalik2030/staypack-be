import { Prop } from '@nestjs/mongoose';
import { BaseSchema } from 'src/app/decorators/base.schema';
import { MongoFactory } from 'src/app/decorators/mongo-factory';
import { MongoSchema } from 'src/app/decorators/mongo.schema';
import { OtpType } from '../types';
import { Expose } from 'class-transformer';

@MongoSchema()
export class OTP extends BaseSchema {
  @Prop()
  hash: string;

  @Prop()
  email: string;

  @Prop()
  type: OtpType;

  @Prop()
  expiry: Date;

  @Expose()
  get isExpired(): boolean {
    return Date.now() > this.expiry.getTime();
  }
}
export const OtpSchema = MongoFactory.createSchema(OTP);
