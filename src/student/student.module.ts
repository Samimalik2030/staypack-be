import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';
import { StudentService } from './service/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema, } from './schema/student.mongo';

import { UserModule } from 'src/user/user.module';
import { JwtTokenService } from 'src/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema}]),UserModule,ConfigModule],
  controllers: [StudentController],
  providers: [StudentService,JwtTokenService],
  
})
export class StudentModule {}
