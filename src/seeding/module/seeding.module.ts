import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { SeedingController } from './seeding.controller';
import {
  GROUP_MODEL,
  groupSchema,
  MENU_MODEL,
  menuSchema,
} from 'src/schemas/roles-and-permissions';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GROUP_MODEL, schema: groupSchema },
      { name: MENU_MODEL, schema: menuSchema },
    ]),
  ],
  controllers: [SeedingController],
  providers: [SeedingService],
})
export class SeedingModule {}
