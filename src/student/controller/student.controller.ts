import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UnauthorizedException, UnprocessableEntityException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { CreateStudentDTO, } from '../dto/student.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UpdateStudentDTO } from '../dto/updateStudent.dto';
import { query, Request } from 'express';
import { UserService } from 'src/user/service/user.service';
import { Role } from 'src/user/types';
import { StudentQueryDTO } from '../dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('student')
@ApiTags()
// @UseGuards(AuthGuard)
// @ApiBearerAuth()
export class StudentController {
    constructor(private readonly studentService: StudentService,
        private readonly userService: UserService
    ) { }

    // @Get() 
    // async getStudents(){
    //     return await this.studentService.getAllStudents()
    // }

    @Get()
    async getAllStudent(@Query() query: StudentQueryDTO) {
        let usersIds;
        if (query.name) {
            const filteredUsers = await this.userService.filter({
                firstName: query.name
            })
            usersIds = filteredUsers.map((user) => user._id)
        }
        const updatedQuery = {
            ...query,
            usersIds
        }

        return await this.studentService.filterStudents(updatedQuery)

    }

    @Post()
    async create(@Body() body: CreateStudentDTO, @Req() req: Request) {
        const user = req.user
        const student = await this.studentService.findOne({
            user: user
        })
        if (student) {
            throw new UnprocessableEntityException('student already exists')
        }
        const updatedUser = await this.userService.update(user.id, {
            role: Role.STUDENT
        })
        const createdStudent = await this.studentService.store(body, updatedUser)
        return createdStudent
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        const foundStudent = await this.studentService.findById(id)
        if (!foundStudent) {
            throw new NotFoundException('student is not')
        }
        return foundStudent
    }
    @Patch(":id")
    async update(@Param("id") id: string, @Body() body: UpdateStudentDTO, @Req() req: Request) {
        console.log(body)
        const user = req.user
        const checkStudent = await this.studentService.findById(id)
        if (!checkStudent) {
            throw new NotFoundException('Student is not found')
        }
        console.log(user.id, 'user')
        console.log(checkStudent.user.id, 'check')
        const canUpdate = user.id === checkStudent.user.id
        if (!canUpdate) {
            throw new UnauthorizedException('You are not allow to update this student ')
        }
        return await this.studentService.update(id, body)
    }
    @Delete(":id")
    async delete(@Param("id") id: string, @Req() req: Request) {
        const user = req.user
        const checkStudent = await this.studentService.findById(id)
        if (!checkStudent) {
            throw new NotFoundException('Student is not found')
        }
        const canDelete = user.id === checkStudent.user.id
        if (!canDelete) {
            throw new UnauthorizedException('You are not allow to delete this student ')
        }
        const deletedStudent = await this.studentService.delete(id)
        await this.userService.update(user.id, {
            role: Role.STANDARD_USER
        })
        return deletedStudent
    }



    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema:{
           type:'object',
           properties:{
            file: {
                type: 'string',
                format: 'binary',
              },
           }
        }
    })
    @Post('/upload-file')
    async uploadFile(
        @UploadedFile() file:Express.Multer.File
    ){
   
    }

}


