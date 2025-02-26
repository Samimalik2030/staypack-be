import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/app/decorators/base.schema';
import { MongoSchema } from 'src/app/decorators/mongo.schema';
import { transformObjectId } from 'src/app/decorators/objectToId';
import { FileDto } from 'src/shared/dtos/file.dto';
import { Role } from '../types';
import { MongoFactory } from 'src/app/decorators/mongo-factory';

export type UserDocument = HydratedDocument<User>;

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

  @ApiProperty({ type: FileDto })
  @Prop({ default: null })
  avatar: FileDto;

  @ApiProperty()
  @Transform(transformObjectId)
  @Prop({
    enum: Role,
  })
  role: Role;

  @Exclude()
  @Prop()
  emailVerifiedAt: Date;

  @Exclude()
  @Prop()
  password: string;

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
