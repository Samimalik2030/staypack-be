import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from '../schema/property.mongo';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';


@Injectable()
export class PropertyService {
    constructor(@InjectModel(Property.name) private readonly propertyModel: Model<Property>) {}

    // Create Property
    async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
        const newProperty = new this.propertyModel(createPropertyDto);
        return newProperty.save();
    }

    // Get all properties
    async findAll(): Promise<Property[]> {
        return this.propertyModel.find().exec();
    }

    // Get property by ID
    async findOne(id: string): Promise<Property> {
        const property = await this.propertyModel.findById(id).exec();
        if (!property) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }
        return property;
    }

    // Update property by ID
    async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
        const updatedProperty = await this.propertyModel.findByIdAndUpdate(id, updatePropertyDto, { new: true }).exec();
        if (!updatedProperty) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }
        return updatedProperty;
    }

    // Delete property by ID
    async remove(id: string): Promise<{ message: string }> {
        const deletedProperty = await this.propertyModel.findByIdAndDelete(id).exec();
        if (!deletedProperty) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }
        return { message: 'Property deleted successfully' };
    }
}
