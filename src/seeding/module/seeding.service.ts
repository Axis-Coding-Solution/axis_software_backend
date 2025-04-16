import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GROUP_MODEL,
  GroupDocument,
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
}
