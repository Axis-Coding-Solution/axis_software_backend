import { PermissionType } from '@/schemas/enums/common';
import { SetMetadata } from '@nestjs/common';

export const MENU_PERMISSION_KEY = 'menu_permission';

export const RequireMenuPermission = (permission: PermissionType) =>
  SetMetadata(MENU_PERMISSION_KEY, { permission });
