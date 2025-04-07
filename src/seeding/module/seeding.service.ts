import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GROUP_MODEL,
  GroupDocument,
  MENU_MODEL,
  MenuDocument,
} from 'src/schemas/roles-and-permissions';

@Injectable()
export class SeedingService {
  constructor(
    @InjectModel(GROUP_MODEL)
    private readonly groupModel: Model<GroupDocument>,

    @InjectModel(MENU_MODEL)
    private readonly menuModel: Model<MenuDocument>,
  ) {}

  async seedGroups() {
    await this.groupModel.deleteMany({});

    await this.groupModel.insertMany(['../data/group.data.seeding.json']);
  }

  async seedMenus() {
    await this.menuModel.deleteMany({});

    await this.menuModel.insertMany(['../data/menus.data.seeding.json']);
  }
}
