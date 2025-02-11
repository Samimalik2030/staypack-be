import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { MongoFactory } from 'src/app/decorators/mongo-factory';
import { MongoSchema } from 'src/app/decorators/mongo.schema';
import { Role } from '../types';
import { BaseSchema } from 'src/app/decorators/base.schema';

@MongoSchema()
export class User extends BaseSchema {
  public readonly etype = 'User';

  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty({ enum: Role })
  @Prop({ enum: Role, default: Role.STANDARD_USER })
  role: Role;

  @Exclude()
  @Prop()
  emailVerifiedAt: Date;

  @Exclude()
  @Prop()
  password: string;

  @Exclude()
  @Prop()
  confirmPassword: string;

  @Exclude()
  @Prop({ default: 0 })
  failedLoginAttempts: number;

  @Exclude()
  @Prop({ default: false })
  isTwoFAEnabled: boolean;

  @ApiProperty({ default: null })
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isEmailVerified(): boolean {
    return !!this.emailVerifiedAt;
  }

  get isAccountLocked(): boolean {
    return this.failedLoginAttempts >= 5 ? true : false;
  }
}

export const UserSchema = MongoFactory.createSchema(User);
