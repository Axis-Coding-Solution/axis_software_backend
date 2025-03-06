import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ApproveLeaveDto } from 'src/definitions/dtos/employees/leave/approve-leave.dto';
import { CreateLeaveDto } from 'src/definitions/dtos/employees/leave/create-leave.dto';
import { EditLeaveDto } from 'src/definitions/dtos/employees/leave/edit-leave.dto';
import { FindUser } from 'src/interface';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { LEAVE_MODEL, LeaveDocument } from 'src/schemas/employees/leave';
import { badRequestException, notFoundException } from 'src/utils';
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
  ) {}

  async create(createLeaveDto: CreateLeaveDto, currentUser: Types.ObjectId) {
    const findCurrentUser = currentUser
      ? await getSingleHelper<FindUser>(currentUser, USER_MODEL, this.userModel)
      : null;

    const employeeId = findCurrentUser?.employeeId;
    employeeId ? await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel) : null;
    createLeaveDto.employeeId = employeeId;

    const { from, to } = createLeaveDto;
    if (from > to) {
      throw badRequestException('From date should be less than to date');
    }

    if (from.getTime() === to.getTime()) {
      throw badRequestException('From date and to date should not be same');
    }

    const noOfDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    createLeaveDto.noOfDays = noOfDays;

    const leave = await createHelper(createLeaveDto, LEAVE_MODEL, this.leaveModel);

    return leave;
  }

  async edit(editLeaveDto: EditLeaveDto, id: Types.ObjectId) {
    const { from, to } = editLeaveDto;
    if (from && to) {
      if (from > to || from === to) {
        throw badRequestException('From date should be less than to date');
      }

      const noOfDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      editLeaveDto.noOfDays = noOfDays;
    }

    const editLeave = await editHelper(id, editLeaveDto, LEAVE_MODEL, this.leaveModel);

    return editLeave;
  }

  async getSingle(id: Types.ObjectId) {
    const leave = await getSingleHelper(id, LEAVE_MODEL, this.leaveModel);

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

    const fromDate = new Date(from);
    const toDate = new Date(to);

    let filters = {};
    // employee ? (filters['employee.firstName'] = { $regex: employee, $options: 'i' }) : null;
    // employee
    //   ? (filters = {
    //       $lookup: {
    //         from: EMPLOYEE_MODEL,
    //         localField: 'employeeId',
    //         foreignField: '_id',
    //         // as: 'employeeId',
    //       },
    //     })
    //   : null;
    leaveType ? (filters['leaveType'] = leaveType) : null;
    status ? (filters['status'] = status) : null;
    from ? (filters['from'] = { $gte: fromDate }) : null;
    to ? (filters['to'] = { $lte: toDate }) : null;

    console.log('🚀 ~ LeaveService ~ filters:', filters);
    const [items, totalItems] = await Promise.all([
      this.leaveModel
        .find(filters)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNumber)
        .populate({
          path: 'employeeId',
          select: 'profileImage firstName lastName',
          match: employee
            ? {
                $or: [
                  { firstName: { $regex: employee, $options: 'i' } },
                  { lastName: { $regex: employee, $options: 'i' } },
                ],
              }
            : {},
        })
        .lean()
        .exec(),
      this.leaveModel.countDocuments(filters).exec(),
    ]);
    const filteredItems = employee ? items.filter((item) => item.employeeId) : items;
    if (filteredItems.length === 0) {
      throw notFoundException(`${LEAVE_MODEL} not found`);
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
    currentUser: Types.ObjectId,
    id: Types.ObjectId,
  ) {
    const { status } = approveLeaveDto;
    const leave = editHelper(id, { status, approvedBy: currentUser }, LEAVE_MODEL, this.leaveModel);

    return leave;
  }
}
