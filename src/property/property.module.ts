import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schema/property.mongo';
import { PropertyController } from './controller/property.controller';
import { PropertyService } from './service/property.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])],
    controllers: [PropertyController],
    providers: [PropertyService],
    exports: [PropertyService],
})
export class PropertyModule {}
