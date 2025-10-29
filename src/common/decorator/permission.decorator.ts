import { PermissionType } from '@/schemas/enums/common';
import { SetMetadata } from '@nestjs/common';

export const MENU_PERMISSION_KEY = 'menu_permission';

export const RequireMenuPermission = (menuTitle: string, permission: PermissionType) =>
  SetMetadata(MENU_PERMISSION_KEY, { menuTitle, permission });
