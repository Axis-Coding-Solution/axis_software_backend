import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';
import helmet from 'helmet';
import * as compression from 'compression';
import { corsConfig } from './lib';
import { ValidationPipe } from '@nestjs/common';
import responseValidation from './validation/exception-factory.validation';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedingService } from './seeding/module/seeding.service';

export const createApp = async () => {
  const app = await NestFactory.create(AppModule);

  //* config vars
  const configService = app.get(AppConfigService);
  // const API_VERSION = configService.apiVersion;
  const PORT = configService.port;

  //* seeding
  // const seedService = app.get(SeedingService);
  // await seedService.seedGroups();
  // await seedService.seedMenus();

  //* middlewares
  app.use(helmet());
  app.use(compression());
  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe(responseValidation));

  //* set Global Prefix
  app.setGlobalPrefix('v1/api');

  //? swagger
  const config = new DocumentBuilder()
    .setTitle('Axis Software Api')
    .setDescription('Axis Software Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //* PORT initialize
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return app;
};
