import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../schema/student.mongo';
import { Model } from 'mongoose';
import { CreateStudentDTO, } from '../dto/student.dto';
import { UpdateStudentDTO } from '../dto/updateStudent.dto';
import { User } from 'src/user/schema/user.schema';
import { StudentQueryDTO } from '../dto/update-student.dto';
import { LaundryPlan } from '../types';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private readonly studentModel: Model<Student>,) { }

    async getAllStudents() { 
        return await this.studentModel.find()
    }
    async filterStudents(filter:any){
      
         return await this.studentModel.find({
           'personalInformation.gender':filter.gender,
        user:{$in:filter.usersIds}  ,
        'laundryPreference.laundryPlan':filter.laundryPlan,
        'educationalInformation.collegeName':filter.collegeName,
        'identificationAndVerification.nationalID':filter.nationalId,
        'paymentInformation.paymentMethod':filter.paynentMethod
        }).populate("user")
    }

    async store(data: CreateStudentDTO, user: User) {
        const createdStudent = await this.studentModel.create({
            personalInformation: data,
            user: user
        })
        return createdStudent

    }


    async findById(id: string): Promise<Student | null> {
        return await this.studentModel.findById(id).populate('user')
    }
    
    async findOne(data: Partial<Student>) {
        return await this.studentModel.findOne(data).populate('user')
    }
    async update(id: string, data: UpdateStudentDTO) { 
        const student = await this.studentModel.findByIdAndUpdate(id, data, {
            returnDocument: 'after'
        }).populate('user')

        let studentObject;
        if (student) {
            studentObject = student.toObject()
        }
        const values = Object.values(studentObject)
        const ifAllValueExist = values.every((value) => value !== null)
        console.log(ifAllValueExist, 'all exists')
        const updateStudent = await this.studentModel.findByIdAndUpdate(id, {
            status: ifAllValueExist ? "Active" : "Draft"
        }, {
            returnDocument: 'after'
        }).populate('user')

        return updateStudent
    }

    async delete(id: string) {
        return await this.studentModel.findByIdAndDelete(id)
    }
   
    
}
