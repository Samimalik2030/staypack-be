import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { CreateStudentDTO, UpdateStudentDTO } from '../dto/student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}

    @Get() 
    async getAllStudents(){
        return await this.studentService.getAllStudents()
    }
    @Post()
    async create(@Body() body:CreateStudentDTO){
        return await this.studentService.store(body)
    }
    @Get(":id")
    async findOne(@Param("id") id:string){
        return await this.studentService.findOne(id)
    }
    @Patch(":id")
    async update(@Param("id") id:string,@Body() body:UpdateStudentDTO){
        const checkStudent = await this.studentService.findOne(id)
        if(!checkStudent){
            throw new NotFoundException('Student is not found')
        }
        return await this.studentService.update(id,body)
    }
    @Delete(":id")
    async delete(@Param("id") id:string){
        const checkStudent = await this.studentService.delete(id)
    }
}
