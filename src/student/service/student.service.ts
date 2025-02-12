import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../schema/student.mongo';
import { Model } from 'mongoose';
import { CreateStudentDTO, UpdateStudentDTO } from '../dto/student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private readonly studentModel: Model<Student>){}
    
    async getAllStudents(){
        return await this.studentModel.find()
    }
    async store(data:CreateStudentDTO){
        return await this.studentModel.create(data)
    }
    async findOne(id:string){
        return await this.studentModel.findById(id)
    }
    async update(id:string,data:UpdateStudentDTO){
        return await this.studentModel.findByIdAndUpdate(id,data,{
        returnDocument:'after'
        })
    }
}
