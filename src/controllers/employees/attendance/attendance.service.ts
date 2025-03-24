import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PunchInDto, PunchOutDto } from 'src/definitions/dtos/employees/attendance';
import { FindAttendanceInterface } from 'src/interfaces';
import { FindUserInterface } from 'src/interfaces/user';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { ATTENDANCE_MODEL, AttendanceDocument } from 'src/schemas/employees/attendance';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { badRequestException, forbiddenException, notFoundException } from 'src/utils';
import { createHelper, editHelper, getSingleHelper } from 'src/utils/helper';
import * as moment from 'moment';

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

    //* find employee id
    const employeeId = findCurrentUser?.employeeId;
    if (!employeeId) throw notFoundException('Employee not found');

    //* search employee
    await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel);
    punchInDto.employeeId = employeeId;

    //* calculate current date
    const date: any = moment();
    punchInDto.date = date;

    //* calculate current time
    const time = date.format('hh:mm:ss A');
    punchInDto.punchIn = time;

    const attendance = await createHelper(punchInDto, ATTENDANCE_MODEL, this.attendanceModel);

    return attendance;
  }

  async punchOut(punchOutDto: PunchOutDto, currentUserId: Types.ObjectId, id: Types.ObjectId) {
    const { isPunch } = punchOutDto;
    if (isPunch) {
      throw badRequestException('Punch Out is required');
    }

    //* find current user
    const findCurrentUser = currentUserId
      ? await getSingleHelper<FindUserInterface>(currentUserId, USER_MODEL, this.userModel)
      : null;

    //* find employee id
    const employeeId = findCurrentUser?.employeeId;
    if (!employeeId) throw notFoundException('Employee not found');

    //* find document
    let attendance = await getSingleHelper<FindAttendanceInterface>(
      id,
      ATTENDANCE_MODEL,
      this.attendanceModel,
    );

    //* is this same employee who punchIn?
    if (attendance?.employeeId.toString() !== employeeId.toString()) {
      throw forbiddenException('You cannot punch out other employee');
    }

    const date: Date = attendance?.date;

    const today: any = moment();

    //* calculate current time
    const time = today.format('hh:mm:ss A');

    //* calculate hours difference btw punch in and out
    const diff = today.diff(date, 'hours');

    //* update total hours
    attendance = await editHelper(
      id,
      { totalHours: diff, punchOut: time, isPunch: false },
      ATTENDANCE_MODEL,
      this.attendanceModel,
    );

    if (diff < attendance?.requiredHours) {
      //* calculate remaining hours
      const remainingHours = attendance?.requiredHours - diff;
      attendance = await editHelper(
        id,
        { remainingHours: remainingHours },
        ATTENDANCE_MODEL,
        this.attendanceModel,
      );
    } else if (diff > attendance?.requiredHours) {
      //* calculate overtime
      const overtime = diff - attendance?.requiredHours;
      attendance = await editHelper(
        id,
        { overtime: overtime },
        ATTENDANCE_MODEL,
        this.attendanceModel,
      );
    }

    return attendance;
  }

  async getSingle(id: Types.ObjectId) {
    const attendance = await getSingleHelper(id, ATTENDANCE_MODEL, this.attendanceModel);

    return attendance;
  }

  async getAll(
    page: string,
    limit: string,
    date?: string,
    month?: string,
    year?: string,
  ): Promise<any> {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const fromDate = date ? new Date(date) : null;

    let filters = {};

    if (fromDate) {
      filters['createdAt'] = { $gte: fromDate, $lt: new Date(fromDate.getTime() + 86400000) };
    }

    if (month || year) {
      filters['$expr'] = { $and: [] };

      if (month) {
        // filters['$expr']['$eq'] = [{ $month: '$createdAt' }, parseInt(month)];
        filters['$expr']['$and']?.push({
          $eq: [{ $month: '$createdAt' }, parseInt(month)],
        });
      }
      if (year) {
        // filters['$expr']['$eq'] = [{ $year: '$createdAt' }, parseInt(year)];
        filters['$expr']['$and']?.push({
          $eq: [{ $year: '$createdAt' }, parseInt(year)],
        });
      }

      if (filters['$expr']['$and'].length === 1) {
        // filters['$expr']['$and'] = filters['$expr']['$and'][0];
        filters['$expr'] = filters['$expr']['$and'][0];
      }
    }

    const [items, totalItems] = await Promise.all([
      this.attendanceModel
        .find(filters)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNumber)
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
