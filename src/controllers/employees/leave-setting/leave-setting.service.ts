import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateLeaveSettingDto,
  EditLeaveSettingDto,
} from 'src/definitions/dtos/employees/leave-setting';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { LEAVE_SETTING_MODEL, LeaveSettingDocument } from 'src/schemas/employees/leave-setting';
import { badRequestException, notFoundException } from 'src/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class LeaveSettingService {
  constructor(
    @InjectModel(LEAVE_SETTING_MODEL)
    private readonly leaveSettingModel: Model<LeaveSettingDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createLeaveSetting: CreateLeaveSettingDto) {
    const { policyName, employeeIds, isCustomPolicy } = createLeaveSetting;
    if (!isCustomPolicy && employeeIds?.length > 0) {
      throw badRequestException('Only custom policy can have employees');
    }

    const [, validEmployeeIds]: any = await Promise.all([
      policyName ? await existsHelper(policyName, 'policyName', this.leaveSettingModel) : null,

      isCustomPolicy && employeeIds?.length > 0
        ? await this.employeeModel.find({ _id: { $in: employeeIds } }, { _id: 1 }).lean()
        : null,
    ]);

    const validEmployeeIdsSet = new Set(validEmployeeIds?.map((e: any) => e?._id?.toString()));
    const missingEmployeeIds = employeeIds?.filter(
      (id: any) => !validEmployeeIdsSet?.has(id?.toString()),
    );
    if (missingEmployeeIds?.length > 0) {
      throw notFoundException(`Some employees not found: ${missingEmployeeIds?.join(', ')}`);
    }

    const leaveSetting = await createHelper(
      createLeaveSetting,
      LEAVE_SETTING_MODEL,
      this.leaveSettingModel,
    );

    return leaveSetting;
  }

  async edit(editLeaveSetting: EditLeaveSettingDto, id: Types.ObjectId) {
    const { policyName, employeeIds, isCustomPolicy } = editLeaveSetting;
    if (!isCustomPolicy && employeeIds?.length > 0) {
      throw badRequestException('Only custom policy can have employees');
    }

    const [, validEmployeeIds]: any = await Promise.all([
      policyName ? await existsHelper(policyName, 'policyName', this.leaveSettingModel, id) : null,

      isCustomPolicy && employeeIds?.length > 0
        ? await this.employeeModel.find({ _id: { $in: employeeIds } }, { _id: 1 }).lean()
        : null,
    ]);

    const validEmployeeIdsSet = new Set(validEmployeeIds?.map((e: any) => e?._id?.toString()));
    const missingEmployeeIds = employeeIds?.filter(
      (id: any) => !validEmployeeIdsSet?.has(id?.toString()),
    );
    if (missingEmployeeIds?.length > 0) {
      throw notFoundException(`Some employees not found: ${missingEmployeeIds?.join(', ')}`);
    }

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
