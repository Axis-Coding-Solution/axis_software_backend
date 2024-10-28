import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './utils';
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // app.useGlobalFilters(new AllExceptionsFilter());
  //? swagger
  const config = new DocumentBuilder()
    .setTitle('Axis Software Api')
    .setDescription('Axis Software Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Application is running on ${PORT}`);
  });
}
bootstrap();
