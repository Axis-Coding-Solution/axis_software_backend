import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createTimesheetDto } from 'src/definitions/dtos/employees/timesheet/create-timesheet.dto';
import { editTimesheetDto } from 'src/definitions/dtos/employees/timesheet/edit-timesheet.dto';
import { FindProjectInterface, FindTimesheetInterface } from 'src/interfaces';
import { FindUserInterface } from 'src/interfaces/user';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { TIMESHEET_MODEL, TimesheetDocument } from 'src/schemas/employees/timesheet';
import { PROJECT_MODEL, ProjectDocument } from 'src/schemas/project';
import { notFoundException } from 'src/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel(TIMESHEET_MODEL)
    private readonly timesheetModel: Model<TimesheetDocument>,

    @InjectModel(PROJECT_MODEL)
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createTimesheetDto: createTimesheetDto, currentUserId: Types.ObjectId) {
    //* find current user
    const findCurrentUser = currentUserId
      ? await getSingleHelper<FindUserInterface>(currentUserId, USER_MODEL, this.userModel)
      : null;

    //* assign employee id
    const employeeId = findCurrentUser?.employeeId;
    if (!employeeId) throw notFoundException('Employee not found');

    //* search employee
    await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel);
    createTimesheetDto.employeeId = employeeId;

    //* search project
    const { projectId, hours } = createTimesheetDto;
    let project = await getSingleHelper<FindProjectInterface>(
      projectId,
      PROJECT_MODEL,
      this.projectModel,
    );

    //* update project
    const updateData: object = {
      remainingHours: project?.remainingHours - hours,
    };
    await editHelper(projectId, updateData, PROJECT_MODEL, this.projectModel);

    const timesheet = await createHelper(createTimesheetDto, TIMESHEET_MODEL, this.timesheetModel);

    return timesheet;
  }

  async edit(editTimesheetDto: editTimesheetDto, id: Types.ObjectId) {
    let { projectId, hours } = editTimesheetDto;

    const project = projectId
      ? await getSingleHelper<FindProjectInterface>(projectId, PROJECT_MODEL, this.projectModel)
      : null;

    const remainingHours = project?.remainingHours;
    const searchTimesheet = id
      ? await getSingleHelper<FindTimesheetInterface>(id, TIMESHEET_MODEL, this.timesheetModel)
      : null;
    const updatedHours = remainingHours + searchTimesheet.hours;

    const editTimesheet = await editHelper(
      id,
      editTimesheetDto,
      TIMESHEET_MODEL,
      this.timesheetModel,
    );

    const updateData: object = {
      remainingHours: updatedHours - hours,
    };
    await editHelper(projectId, updateData, PROJECT_MODEL, this.projectModel);

    return editTimesheet;
  }

  async getSingle(id: Types.ObjectId): Promise<any> {
    const timesheet = await getSingleHelper(id, TIMESHEET_MODEL, this.timesheetModel);

    return timesheet;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.timesheetModel,
      null,
      null,
      [
        {
          path: 'projectId',
          select: 'projectName -_id',
        },
      ],
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
    const timesheet = await deleteHelper(id, TIMESHEET_MODEL, this.timesheetModel);

    return timesheet;
  }
}
