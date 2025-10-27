import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';
import helmet from 'helmet';
import * as compression from 'compression';
import { corsConfig } from './lib';
import { ValidationPipe } from '@nestjs/common';
import responseValidation from './validation/exception-factory.validation';
import { SeedingService } from './seeding/module/seeding.service';
import { AllExceptionsFilter } from './utils';
import { createDocument } from './swagger/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export const createApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
  app.useGlobalFilters(new AllExceptionsFilter());

  //* set Global Prefix
  app.setGlobalPrefix('v1/api');

  //* swagger
  createDocument(app);

  //* PORT initialize
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return app;
};
