import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PropertyService } from '../service/property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';


@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    // Create a new property
    @Post()
    async create(@Body() createPropertyDto: CreatePropertyDto) {
        return this.propertyService.create(createPropertyDto);
    }

    // Get all properties
    @Get()
    async findAll() {
        return this.propertyService.findAll();
    }

    // Get a single property by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.propertyService.findOne(id);
    }

    // Update a property by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
        return this.propertyService.update(id, updatePropertyDto);
    }

    // Delete a property by ID
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.propertyService.remove(id);
    }
}
