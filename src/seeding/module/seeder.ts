import { AppModule } from '@/app.module';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedingService } from './seeding.service';

async function bootstrap(): Promise<void> {
  const app: INestApplicationContext = await NestFactory.createApplicationContext(AppModule);

  const seedService = app.get(SeedingService);

  //* groups
  // await seedService
  //   .seedGroups()
  //   .then(() => console.log('Groups seeded'))
  //   .catch((err) => console.log('Error seeding groups', err));

  //* menus
  // await seedService
  //   .seedMenus()
  //   .then(() => console.log('Menus seeded'))
  //   .catch((err) => console.log('Error seeding menus', err));

  //* group-menus
  await seedService
    .seedGroupMenus()
    .then(() => console.log('Group-menus seeded'))
    .catch((err) => console.log('Error seeding group-menus', err));

  await app.close();
}

bootstrap();
