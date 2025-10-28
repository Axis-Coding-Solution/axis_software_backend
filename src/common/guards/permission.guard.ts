import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MENU_PERMISSION_KEY } from '../decorator';
import { CustomForbiddenException } from '@/utils';
import { MenuPermissionInterface } from '../interfaces';

@Injectable()
export class MenuPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const menuPermission = this.reflector.getAllAndOverride<MenuPermissionInterface>(
      MENU_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!menuPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { permission } = menuPermission;

    const permissionValue = request.query[permission];

    if (permissionValue !== 'true') {
      throw CustomForbiddenException(`You don't have ${permission} permission for this resource`);
    }

    return true;
  }
}
