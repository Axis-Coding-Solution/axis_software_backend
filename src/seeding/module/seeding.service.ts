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

    await this.groupModel.insertMany([
      {
        role: 'admin',
        description: 'Administrator with full access',
      },
      {
        role: 'user',
        description: 'Regular user with limited access',
      },
      {
        role: 'employee',
        description: 'Company employee with internal access',
      },
      {
        role: 'client',
        description: 'External client with specific access',
      },
    ]);
  }

  async seedMenus() {
    await this.menuModel.deleteMany({});

    await this.menuModel.insertMany([
      {
        name: 'Employees',
        path: '/employees',
      },
      {
        name: 'Employees',
        path: '/employees-list',
      },
      {
        name: 'Holidays',
        path: '/holidays',
      },
      {
        name: 'Admin Leaves',
        path: '/adminleaves',
      },
      {
        name: 'Leaves Employee',
        path: '/leaves-employee',
      },
      {
        name: 'Leave Settings',
        path: '/leave-settings',
      },
      {
        name: 'Admin Attendance',
        path: '/adminattendance',
      },
      {
        name: 'Attendance Employee',
        path: '/attendance-employee',
      },
      {
        name: 'Departments',
        path: '/departments',
      },
      {
        name: 'Designations',
        path: '/designations',
      },
      {
        name: 'Timesheet',
        path: '/timesheet',
      },
      {
        name: 'Overtime',
        path: '/overtime',
      },
    ]);
  }
}
