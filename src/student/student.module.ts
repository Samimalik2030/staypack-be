import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';
import { StudentService } from './service/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, studentSchema } from './schema/student.mongo';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }])],
  
})
export class StudentModule {}
