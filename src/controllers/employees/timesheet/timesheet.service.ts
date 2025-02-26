import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTimesheetDto } from 'src/definitions/dtos/employees/timesheet/create-timesheet.dto';
import { editTimesheetDto } from 'src/definitions/dtos/employees/timesheet/edit-timesheet.dto';
import { TIMESHEET_MODEL, TimesheetDocument } from 'src/schemas/employees/timesheet';
import { PROJECT_MODEL, ProjectDocument } from 'src/schemas/project';
import {
  badRequestException,
  conflictException,
  isValidMongoId,
  notFoundException,
} from 'src/utils';
import { deleteHelper, getPagination, getSingleHelper } from 'src/utils/helper';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel(TIMESHEET_MODEL)
    private readonly timesheetModel: Model<TimesheetDocument>,

    @InjectModel(PROJECT_MODEL)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(createTimesheetDto: createTimesheetDto) {
    const { projectId } = createTimesheetDto;

    const timesheetExists = await this.projectModel.findById(projectId);
    if (!timesheetExists) {
      throw notFoundException('Project not found');
    }

    const timesheet = await this.timesheetModel.create({
      ...createTimesheetDto,
    });
    if (!timesheet) {
      throw badRequestException('timesheet not created');
    }

    return timesheet;
  }

  async edit(editTimesheetDto: editTimesheetDto, id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('timesheet id is not valid');
    }

    let { projectId } = editTimesheetDto;

    if (projectId) {
      const projectExists = await this.projectModel.findById(projectId);
      if (!projectExists) {
        throw notFoundException('Project not found');
      }
    }

    const editTimesheet = await this.timesheetModel.findByIdAndUpdate(
      id,
      {
        ...editTimesheetDto,
      },
      { new: true },
    );
    if (!editTimesheet) {
      throw notFoundException('timesheet not found');
    }

    return editTimesheet;
  }

  async getSingle(id: string): Promise<any> {
    const timesheet = await getSingleHelper(id, TIMESHEET_MODEL, this.timesheetModel);

    return timesheet;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getPagination(
      page,
      limit,
      this.timesheetModel,
      null,
      null,
      'projectId',
    );

    if (items.length === 0) {
      throw notFoundException('Departments not found');
    }

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

  async delete(id: string) {
    const timesheet = await deleteHelper(id, TIMESHEET_MODEL, this.timesheetModel);

    return timesheet;
  }
}
