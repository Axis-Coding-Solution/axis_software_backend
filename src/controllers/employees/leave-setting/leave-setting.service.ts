import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateLeaveSettingDto,
  EditLeaveSettingDto,
} from 'src/definitions/dtos/employees/leave-setting';
import { LEAVE_SETTING_MODEL, LeaveSettingDocument } from 'src/schemas/employees/leave-setting';
import {
  createHelper,
  deleteHelper,
  editHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class LeaveSettingService {
  constructor(
    @InjectModel(LEAVE_SETTING_MODEL)
    private readonly leaveSettingModel: Model<LeaveSettingDocument>,
  ) {}

  async create(createLeaveSetting: CreateLeaveSettingDto) {
    const leaveSetting = await createHelper(
      createLeaveSetting,
      LEAVE_SETTING_MODEL,
      this.leaveSettingModel,
    );

    return leaveSetting;
  }

  async edit(editLeaveSetting: EditLeaveSettingDto, id: Types.ObjectId) {
    const leaveSetting = await editHelper(
      id,
      editLeaveSetting,
      LEAVE_SETTING_MODEL,
      this.leaveSettingModel,
    );

    return leaveSetting;
  }

  async getSingle(id: Types.ObjectId) {
    const leaveSetting = await getSingleHelper(id, LEAVE_SETTING_MODEL, this.leaveSettingModel);

    return leaveSetting;
  }

  async getAll(page: string, limit: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.leaveSettingModel,
    );

    return {
      data: items,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
      },
    };
  }

  async delete(id: Types.ObjectId) {
    const leaveSetting = await deleteHelper(id, LEAVE_SETTING_MODEL, this.leaveSettingModel);

    return leaveSetting;
  }
}
