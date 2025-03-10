import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './controller/app.controller';
import { ClassValidationPipe } from './pipes/validation.pipe';
import { SchemaToClassInterceptor } from './interceptor/schema-to-class.interceptor';
import { AuthorizationInterceptor } from './interceptor/authorization.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './service/app.service';
import { UserModule } from 'src/user/user.module';
import { TodoModule } from 'src/todo/todo.module';
import { StudentModule } from 'src/student/student.module';
import { ImageKitModule } from 'src/image-kit/image-kit.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { HostModule } from 'src/host/host.module';
import { HostelModule } from 'src/hostel/module/hostel.module';
import { JwtModule } from '@nestjs/jwt';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TodoModule,
    StudentModule,
    ImageKitModule,
    MailerModule,
    HostModule,
    HostelModule,
    PropertyModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_PIPE, useClass: ClassValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: SchemaToClassInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AuthorizationInterceptor },
    AppService,
  ],
})
export class AppModule {}
