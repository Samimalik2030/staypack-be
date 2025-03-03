import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hostel } from '../schema/hostel.mongo';
import { Model } from 'mongoose';
import { UpdateHostelDTO } from '../dto/update-hostel.dto';
import { CreateHostelDTO } from '../dto/createhHostel.dto';
import { Host } from 'src/host/schema/host.mongo';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class HostelService {
  constructor(
    @InjectModel(Hostel.name) private readonly hostelModel: Model<Hostel>,
  ) {}

  async getAllHostels() {
    return await this.hostelModel.find();
  }

  async create(data: CreateHostelDTO, host: Host) {
    console.log(data)
    return await this.hostelModel.create({
      hostelInformation: data,
      host,
    });
  }

  async getHostel(id: string) {
    const foundedHostel = await this.hostelModel
      .findById(id)
      .populate('Hostel');
    return foundedHostel;
  }
  async update(id: string, data: UpdateHostelDTO) {
    const hostel = await this.hostelModel
      .findByIdAndUpdate(id, data, {
        returnDocument: 'after',
      })
      .populate('Hostel');
    let hostelObject;
    if (hostel) hostelObject = hostel.toObject();
    const values = Object.values(hostelObject);
    const ifAllValueExist = values.every((key) => key !== null);
    const updatedHostel = await this.hostelModel
      .findByIdAndUpdate(
        id,
        {
          status: ifAllValueExist ? 'Active' : 'Draft',
        },
        {
          returnDocument: 'after',
        },
      )
      .populate('Hostel');
    return updatedHostel;
  }
  async delete(id: string) {
    const deletedHostel = await this.hostelModel.findByIdAndDelete(id);
    return deletedHostel;
  }
}
