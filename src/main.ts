import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app/app.module';
import { ClassValidationPipe } from './app/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  let version = '0.0.0';
  app.useGlobalPipes(new ClassValidationPipe());
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'StyaPack')
    .setVersion(`${version}`);
  const doc = SwaggerModule.createDocument(app, config.addBearerAuth().build());
  SwaggerModule.setup('api', app, doc);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();  