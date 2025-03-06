import { Injectable } from '@nestjs/common';
import {
  DEPARTMENT_MODEL,
  DepartmentDocument,
} from 'src/schemas/employees/department/department.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createDepartmentDto,
  editDepartmentDto,
} from 'src/definitions/dtos/employees/department';
import {
  badRequestException,
  isValidMongoId,
  notFoundException,
} from 'src/utils';
import { getAllHelper } from 'src/utils/helper';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(createDepartmentDto: createDepartmentDto) {
    const { departmentName } = createDepartmentDto;
    if (!departmentName) {
      throw badRequestException('Department name is required');
    }

    const departmentExists = await this.departmentModel.exists({
      departmentName,
    });
    if (departmentExists) {
      throw badRequestException('Department already exists');
    }

    const department = await this.departmentModel.create({ departmentName });
    if (!department) {
      throw badRequestException('Department not created');
    }

    return department;
  }

  async edit(editDepartmentDto: editDepartmentDto, id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Department id is not valid');
    }

    const { departmentName } = editDepartmentDto;
    if (!departmentName) {
      throw badRequestException('Department name is required');
    }

    const editDepartment = await this.departmentModel.findByIdAndUpdate(
      id,
      {
        departmentName,
      },
      { new: true },
    );
    if (!editDepartment) {
      throw notFoundException('Department not updated');
    }

    return editDepartment;
  }

  async getSingle(id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Department id is not valid');
    }

    const department = await this.departmentModel.findById(id);
    if (!department) {
      throw notFoundException('Department not found');
    }

    return department;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } =
      await getAllHelper(
        page,
        limit,
        this.departmentModel,
        search,
        'departmentName',
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

  async delete(id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Department id is not valid');
    }

    const department = await this.departmentModel.findByIdAndDelete(id);
    if (!department) {
      throw notFoundException('Department not found');
    }

    return department;
  }
}
