import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GROUP_MENU_MODEL,
  GROUP_MODEL,
  GroupDocument,
  GroupMenuDocument,
  MENU_MODEL,
  MenuDocument,
} from 'src/schemas/roles-and-permissions';
import { groupData, menuData } from '../data';
@Injectable()
export class SeedingService {
  constructor(
    @InjectModel(GROUP_MODEL)
    private readonly groupModel: Model<GroupDocument>,

    @InjectModel(MENU_MODEL)
    private readonly menuModel: Model<MenuDocument>,

    @InjectModel(GROUP_MENU_MODEL)
    private readonly groupMenuModel: Model<GroupMenuDocument>,
  ) {}

  async seedGroups() {
    const groups = await this.groupModel.find();

    if (groups.length === 0) {
      await this.groupModel.insertMany(groupData);
      return;
    }

    const isGroupExists = groupData.filter((group) => !groups.find((g) => g.role === group.role));

    if (isGroupExists) {
      await this.groupModel.create(isGroupExists);
    }
  }

  async seedMenus() {
    const menus = await this.menuModel.find();

    if (menus.length === 0) {
      await this.menuModel.insertMany(menuData);
      return;
    }

    const isMenuExist = menuData.filter((menu) => !menus.find((m) => m.title === menu.title));
    if (isMenuExist) {
      await this.menuModel.create(isMenuExist);
    }
  }

  async seedGroupMenus() {
    const groups = await this.groupModel.find();
    const menus = await this.menuModel.find();
    for (const group of groups) {
      //* if group is admin then assign all permissions to true
      const isGroupAdmin = await this.groupModel.findOne({ role: 'superadmin' }).exec();
      console.log('🚀 ~ SeedingService ~ seedGroupMenus ~ isGroupAdmin:', isGroupAdmin);
      if (isGroupAdmin.role === 'superadmin') {
        for (const menu of menus) {
          const groupMenu = await this.groupMenuModel.findOne({
            groupId: group._id,
            menuId: menu._id,
          });
          if (!groupMenu) {
            await this.groupMenuModel.create({
              groupId: group._id,
              menuId: menu._id,
              read: true,
              write: true,
              import: true,
              export: true,
            });
          }
        }
      } else {
        //* if group is not admin then assign all permissions to false
        for (const menu of menus) {
          const groupMenu = await this.groupMenuModel.findOne({
            groupId: group._id,
            menuId: menu._id,
          });
          if (!groupMenu) {
            await this.groupMenuModel.create({
              groupId: group._id,
              menuId: menu._id,
              read: false,
              write: false,
              import: false,
              export: false,
            });
          }
        }
      }
    }
  }
}
