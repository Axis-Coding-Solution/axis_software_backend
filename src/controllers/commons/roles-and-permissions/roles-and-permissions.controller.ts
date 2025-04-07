import { Controller } from '@nestjs/common';
import { RolesAndPermissionsService } from './roles-and-permissions.service';

@Controller('roles-and-permissions')
export class RolesAndPermissionsController {
  constructor(private readonly rolesAndPermissionsService: RolesAndPermissionsService) {}
}
