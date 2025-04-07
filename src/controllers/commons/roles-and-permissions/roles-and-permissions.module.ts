import { Module } from '@nestjs/common';
import { RolesAndPermissionsService } from './roles-and-permissions.service';
import { RolesAndPermissionsController } from './roles-and-permissions.controller';

@Module({
  controllers: [RolesAndPermissionsController],
  providers: [RolesAndPermissionsService],
})
export class RolesAndPermissionsModule {}
