import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  GROUP_MENU_MODEL,
  GROUP_MODEL,
  GroupDocument,
  GroupMenuDocument,
  MENU_MODEL,
  MenuDocument,
} from '@/schemas/roles-and-permissions';
import { MENU_PERMISSION_KEY } from '../decorator';
import { UserPayloadInterface } from '../interfaces/user';
import { CustomForbiddenException } from '@/utils';
import { MenuPermissionInterface } from '../interfaces';

@Injectable()
export class MenuPermissionGuard implements CanActivate {
  private readonly CACHE_TTL = 300;
  private readonly CACHE_PREFIX = 'menu_permission:';

  constructor(
    private reflector: Reflector,

    @InjectModel(GROUP_MENU_MODEL)
    private readonly groupMenuModel: Model<GroupMenuDocument>,

    @InjectModel(GROUP_MODEL)
    private readonly groupModel: Model<GroupDocument>,

    @InjectModel(MENU_MODEL)
    private readonly menuModel: Model<MenuDocument>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const menuPermission = this.reflector.getAllAndOverride<MenuPermissionInterface>(
      MENU_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!menuPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserPayloadInterface;

    if (!user || !user.role) {
      throw CustomForbiddenException('User not authenticated');
    }

    const { menuTitle, permission } = menuPermission;

    const normalizedTitle = menuTitle.toLowerCase().trim();
    const cacheKey = `${this.CACHE_PREFIX}${user.role}:${normalizedTitle}:${permission}`;

    let hasPermission: boolean | null = await this.cacheManager.get(cacheKey);

    if (hasPermission === null || hasPermission === undefined) {
      hasPermission = await this.checkPermissionFromDatabase(user.role, menuTitle, permission);

      await this.cacheManager.set(cacheKey, hasPermission, this.CACHE_TTL);
    }

    if (!hasPermission) {
      throw CustomForbiddenException(`You don't have ${permission} permission for ${menuTitle}`);
    }

    return true;
  }

  private async checkPermissionFromDatabase(
    userRole: string,
    menuTitle: string,
    permission: string,
  ): Promise<boolean> {
    try {
      const group = await this.groupModel.findOne({ role: userRole }).select('_id').lean();

      if (!group) {
        return false;
      }

      const menu = await this.menuModel
        .findOne({
          title: { $regex: new RegExp(`^${menuTitle}$`, 'i') },
        })
        .select('_id')
        .lean();

      if (!menu) {
        return false;
      }

      const groupMenu = await this.groupMenuModel
        .findOne({
          groupId: group._id,
          menuId: menu._id,
        })
        .select(permission)
        .lean();

      if (!groupMenu) {
        return false;
      }

      return groupMenu[permission] === true;
    } catch (error) {
      console.error('Error checking permission from database:', error);
      return false;
    }
  }
}
