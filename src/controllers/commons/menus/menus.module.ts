import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MENU_MODEL, menuSchema } from 'src/schemas/roles-and-permissions';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: MENU_MODEL, schema: menuSchema }])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
