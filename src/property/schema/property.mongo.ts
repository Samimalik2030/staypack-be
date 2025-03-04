import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Schema } from 'mongoose';
import { BaseSchema } from 'src/app/decorators/base.schema';
import { MongoSchema } from 'src/app/decorators/mongo.schema';
import { FileDto } from '../types';
import { transformObjectId } from 'src/app/decorators/objectToId';
import { Host } from 'src/host/schema/host.mongo';
import { MongoFactory } from 'src/app/decorators/mongo-factory';

@MongoSchema()
export class Property extends BaseSchema  {
  readonly etype = 'Property';

  @Prop({ default: null })
  @ApiProperty()
  name: string;

  @Prop({ default: null })
  @ApiProperty()
  type: string;

  @Prop({ default: null })
  @ApiProperty()
  country: string;

  @Prop({ default: null })
  @ApiProperty()
  state: string;

  @Prop({ default: null })
  @ApiProperty()
  city: string;

  @Prop({ default: null })
  @ApiProperty()
  location: string;

  @Prop({ default: null })
  @ApiProperty({ type: Number })
  latitude: Number;

  @Prop({ default: null })
  @ApiProperty({ type: Number })
  longitude: Number;

  @Prop({ default: null })
  @ApiProperty()
  areaUnit: string;

  @Prop({ default: null })
  @ApiProperty()
  propertySize: number;

  @Prop({ default: null })
  @ApiProperty()
  currency: string;

  @Prop({ default: null })
  @ApiProperty()
  rent: number;

  @Prop({ default: null })
  @ApiProperty()
  bedrooms: number;

  @Prop({ default: null })
  @ApiProperty()
  bathrooms: number;

  @Prop({ default: null })
  @ApiProperty({ type: Number })
  kitchen: number;

  @Prop({ default: null })
  @ApiProperty({ type: String })
  garage: string;

  @Prop({ default: null })
  @ApiProperty()
  description: string;

  @Prop({ default: null })
  @ApiProperty()
  condition: string;

  @Prop({ default: null })
  @ApiProperty({ type: FileDto, isArray: true })
  photos: FileDto[];

  @Prop()
  @ApiProperty()
  status: string;

  @ApiProperty()
  @Prop()
  availability: string;



  @Prop({ type: Schema.Types.ObjectId, ref: 'Host' })
  @Transform(transformObjectId)
  owner: Host;
}

export const PropertySchema = MongoFactory.createSchema(Property);
