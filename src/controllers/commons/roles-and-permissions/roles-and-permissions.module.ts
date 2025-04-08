import { Module } from '@nestjs/common';
import { RolesAndPermissionsService } from './roles-and-permissions.service';
import { RolesAndPermissionsController } from './roles-and-permissions.controller';
import {
  GROUP_MENU_MODEL,
  GROUP_MODEL,
  groupMenuSchema,
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
      { name: GROUP_MENU_MODEL, schema: groupMenuSchema },
    ]),
  ],
  controllers: [RolesAndPermissionsController],
  providers: [RolesAndPermissionsService],
})
export class RolesAndPermissionsModule {}
