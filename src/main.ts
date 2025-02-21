import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app/app.module';
import { ClassValidationPipe } from './app/pipes/validation.pipe';

async function bootstrap() {
  // Create the Nest application and enable CORS
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Read package.json file for version information
  let version = '1.0.0';

//   const content = fs.readFileSync(__dirname + '/../../package.json').toString();
//   if (content) {
//     const json = JSON.parse(content);
//     version = json.version;
//   }

  // Use validation pipe for input validation
  app.useGlobalPipes(new ClassValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'TN Nest App')
    .setVersion(`${version}`);

  const doc = SwaggerModule.createDocument(app, config.addBearerAuth().build());

  SwaggerModule.setup('api', app, doc);

  // Start the application
  await app.listen(process.env.PORT || 3000);
}
bootstrap();  