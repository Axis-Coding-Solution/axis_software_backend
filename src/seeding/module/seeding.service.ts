import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GROUP_MODEL,
  GroupDocument,
  MENU_MODEL,
  MenuDocument,
} from 'src/schemas/roles-and-permissions';
import * as fs from 'fs';
import * as path from 'path';
import { groupData, menuData } from '../data';
// import groupData from JSON.parse('../data/group.data.seeding.json');
// const groupData = JSON.parse(fs.readFileSync(path:`${__dirname}/data/group.data.seeding.json`,options: 'utf-8'));
// console.log("🚀 ~ groupData:", groupData)
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

    await this.groupModel.insertMany(groupData);
  }

  async seedMenus() {
    await this.menuModel.deleteMany({});

    await this.menuModel.insertMany(menuData);
  }
}
