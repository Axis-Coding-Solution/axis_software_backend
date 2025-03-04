import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOvertimeDto } from 'src/definitions/dtos/employees/overtime/create-overtime.dto';
import { EditOvertimeDto } from 'src/definitions/dtos/employees/overtime/edit-overtime.dto';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { OVERTIME_MODEL, OvertimeDocument } from 'src/schemas/employees/overtime';
import {
  createHelper,
  deleteHelper,
  editHelper,
  getPagination,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class OvertimeService {
  constructor(
    @InjectModel(OVERTIME_MODEL)
    private readonly overtimeModel: Model<OvertimeDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createOvertimeDto: CreateOvertimeDto) {
    const { employeeId } = createOvertimeDto;
    await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel);

    const overtime = await createHelper(createOvertimeDto, OVERTIME_MODEL, this.overtimeModel);

    return overtime;
  }

  async edit(editOvertimeDto: EditOvertimeDto, id: Types.ObjectId) {
    const { employeeId } = editOvertimeDto;
    employeeId ? await getSingleHelper(employeeId, EMPLOYEE_MODEL, this.employeeModel) : null;

    const editOvertime = await editHelper(id, editOvertimeDto, OVERTIME_MODEL, this.overtimeModel);

    return editOvertime;
  }

  async getSingle(id: Types.ObjectId) {
    const overtime = await getSingleHelper(id, OVERTIME_MODEL, this.overtimeModel);

    return overtime;
  }

  async getAll(page: string, limit: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getPagination(
      page,
      limit,
      this.overtimeModel,
      null,
      null,
      'employeeId',
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
    const overtime = await deleteHelper(id, OVERTIME_MODEL, this.overtimeModel);

    return overtime;
  }
}
