import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';
import { StudentService } from './service/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema, } from './schema/student.mongo';
import { TokenService } from 'src/jwt/jwt.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema}]),UserModule],
  controllers: [StudentController],
  providers: [StudentService,TokenService],
  
})
export class StudentModule {}
