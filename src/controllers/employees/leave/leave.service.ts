import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ApproveLeaveDto } from 'src/definitions/dtos/employees/leave/approve-leave.dto';
import { CreateLeaveDto } from 'src/definitions/dtos/employees/leave/create-leave.dto';
import { EditLeaveDto } from 'src/definitions/dtos/employees/leave/edit-leave.dto';
import { FindUserInterface } from 'src/common/interfaces/user';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { LEAVE_MODEL, LeaveDocument } from 'src/schemas/employees/leave';
import { LEAVE_SETTING_MODEL, LeaveSettingDocument } from 'src/schemas/employees/leave-setting';
import { CustomBadRequestException, CustomNotFoundException } from 'src/utils';
import { createHelper, deleteHelper, editHelper, getSingleHelper } from 'src/utils/helper';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(LEAVE_MODEL)
    private readonly leaveModel: Model<LeaveDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(LEAVE_SETTING_MODEL)
    private readonly leaveSettingModel: Model<LeaveSettingDocument>,
  ) {}

  async create(createLeaveDto: CreateLeaveDto, currentUserId: Types.ObjectId) {
    //? find current user
    const findCurrentUser = currentUserId
      ? await getSingleHelper<FindUserInterface>(currentUserId, USER_MODEL, this.userModel)
      : null;

    //? assign employee id
    const employeeId = findCurrentUser?.employeeId;
    if (!employeeId) throw CustomNotFoundException('Employee not found');

    //? search employee
    await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel);
    createLeaveDto.employeeId = employeeId;

    const { leaveType, from, to } = createLeaveDto;
    await getSingleHelper(leaveType, LEAVE_SETTING_MODEL, this.leaveSettingModel);

    if (from > to) {
      throw CustomBadRequestException('From date should be less than to date');
    }

    if (from.getTime() === to.getTime()) {
      throw CustomBadRequestException('From date and to date should not be same');
    }

    const noOfDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    createLeaveDto.noOfDays = noOfDays;

    const leave = await createHelper(createLeaveDto, LEAVE_MODEL, this.leaveModel);

    return leave;
  }

  async edit(editLeaveDto: EditLeaveDto, id: Types.ObjectId) {
    const { leaveType, from, to } = editLeaveDto;

    leaveType
      ? await getSingleHelper(leaveType, LEAVE_SETTING_MODEL, this.leaveSettingModel)
      : null;

    if (from && to) {
      if (from > to || from === to) {
        throw CustomBadRequestException('From date should be less than to date');
      }

      const noOfDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      editLeaveDto.noOfDays = noOfDays;
    }

    const editLeave = await editHelper(id, editLeaveDto, LEAVE_MODEL, this.leaveModel);

    return editLeave;
  }

  async getSingle(id: Types.ObjectId) {
    const leave = await getSingleHelper(
      id,
      LEAVE_MODEL,
      this.leaveModel,
      'leaveType',
      'policyName noOfDays',
    );

    return leave;
  }

  async getAll(
    page: string,
    limit: string,
    employee?: string,
    leaveType?: string,
    status?: string,
    from?: string,
    to?: string,
  ): Promise<any> {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    let filters = {};
    if (employee) {
      const employeeIds = await this.employeeModel
        .find({ firstName: { $regex: employee, $options: 'i' } })
        .distinct('_id')
        .exec();

      filters['employeeId'] = { $in: employeeIds };
    }

    leaveType ? (filters['leaveType'] = leaveType) : null;
    status ? (filters['status'] = status) : null;
    from ? (filters['from'] = { $gte: fromDate }) : null;
    to ? (filters['to'] = { $lte: toDate }) : null;

    const [items, totalItems] = await Promise.all([
      this.leaveModel
        .find(filters)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNumber)
        .populate([
          { path: 'employeeId', select: 'profileImage firstName lastName -_id' },
          { path: 'leaveType', select: 'policyName noOfDays -_id' },
        ])
        .lean()
        .exec(),
      this.leaveModel.countDocuments(filters).exec(),
    ]);

    if (items.length === 0) {
      throw CustomNotFoundException(`${LEAVE_MODEL} not found`);
    }

    const totalPages = Math.ceil(totalItems / limitNumber);

    return {
      data: items,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        itemsPerPage: limitNumber,
        currentPage: pageNumber,
      },
    };
  }

  async delete(id: Types.ObjectId) {
    const leave = await deleteHelper(id, LEAVE_MODEL, this.leaveModel);

    return leave;
  }

  async approval(
    approveLeaveDto: ApproveLeaveDto,
    currentUserId: Types.ObjectId,
    id: Types.ObjectId,
  ) {
    const { status } = approveLeaveDto;
    const leave = editHelper(
      id,
      { status, approvedBy: currentUserId },
      LEAVE_MODEL,
      this.leaveModel,
    );

    return leave;
  }
}
