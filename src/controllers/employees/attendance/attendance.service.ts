import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PunchInDto, PunchOutDto } from 'src/definitions/dtos/employees/attendance';
import { FindUserInterface } from 'src/interfaces/user';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { ATTENDANCE_MODEL, AttendanceDocument } from 'src/schemas/employees/attendance';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { badRequestException, notFoundException } from 'src/utils';
import { createHelper, getSingleHelper } from 'src/utils/helper';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(ATTENDANCE_MODEL)
    private attendanceModel: Model<AttendanceDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private employeeModel: Model<EmployeeDocument>,

    @InjectModel(USER_MODEL)
    private userModel: Model<UserDocument>,
  ) {}
  async punchIn(punchInDto: PunchInDto, currentUserId: Types.ObjectId) {
    const { isPunch } = punchInDto;
    if (!isPunch) {
      throw badRequestException('Punch In is required');
    }
    //* find current user
    const findCurrentUser = currentUserId
      ? await getSingleHelper<FindUserInterface>(currentUserId, USER_MODEL, this.userModel)
      : null;

    //* assign employee id
    const employeeId = findCurrentUser?.employeeId;
    if (!employeeId) throw notFoundException('Employee not found');

    //* search employee
    await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel);
    punchInDto.employeeId = employeeId;

    //* calculate current date
    const date = new Date();
    punchInDto.date = date;

    //* calculate current time
    const time = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
    punchInDto.punchIn = time;

    const attendance = await createHelper(punchInDto, ATTENDANCE_MODEL, this.attendanceModel);

    return attendance;
  }

  async punchOut(punchOutDto: PunchOutDto, currentUser: Types.ObjectId, id: Types.ObjectId) {
    const { isPunch } = punchOutDto;
    if (isPunch) {
      throw badRequestException('Punch Out is required');
    }

    //* find document
    const attendance = await getSingleHelper(id, ATTENDANCE_MODEL, this.attendanceModel);
  }

  async getSingle(id: Types.ObjectId) {
    const attendance = await getSingleHelper(id, ATTENDANCE_MODEL, this.attendanceModel);

    return attendance;
  }

  async getAll(page: string, limit: string, from?: string, to?: string): Promise<any> {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    let filters = {};

    from ? (filters['from'] = { $gte: fromDate }) : null;
    to ? (filters['to'] = { $lte: toDate }) : null;

    const [items, totalItems] = await Promise.all([
      this.attendanceModel
        .find(filters)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNumber)
        // .populate([
        //   { path: 'employeeId', select: 'profileImage firstName lastName -_id' },
        //   { path: 'leaveType', select: 'policyName noOfDays -_id' },
        // ])
        .lean()
        .exec(),
      this.attendanceModel.countDocuments(filters).exec(),
    ]);

    if (items.length === 0) {
      throw notFoundException(`${ATTENDANCE_MODEL} not found`);
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
}
