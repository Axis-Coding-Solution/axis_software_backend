import { AppModule } from '@/app.module';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedingService } from './seeding.service';

async function bootstrap(): Promise<void> {
  const app: INestApplicationContext = await NestFactory.createApplicationContext(AppModule);

  const seedService = app.get(SeedingService);

  //* groups
  await seedService.seedGroups().catch((err) => console.log('Error seeding groups', err));

  //* menus
  await seedService.seedMenus().catch((err) => console.log('Error seeding menus', err));

  await app.close();
}

bootstrap();
