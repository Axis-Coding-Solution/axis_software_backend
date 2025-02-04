import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createDesignationDto,
  editDesignationDto,
} from 'src/definitions/dtos/employees/designation';
import {
  DEPARTMENT_MODEL,
  DepartmentDocument,
} from 'src/schemas/employees/department';
import {
  DESIGNATION_MODEL,
  DesignationDocument,
} from 'src/schemas/employees/designation';
import {
  badRequestException,
  getPagination,
  isValidMongoId,
  notFoundException,
} from 'src/util';

@Injectable()
export class DesignationService {
  constructor(
    @InjectModel(DESIGNATION_MODEL)
    private readonly designationModel: Model<DesignationDocument>,

    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}
  async create(createDesignationDto: createDesignationDto) {
    const { designationName, departmentId } = createDesignationDto;

    const designationExists = await this.designationModel.exists({
      designationName,
    });
    if (designationExists) {
      throw badRequestException('Designation already exists');
    }

    const departmentExists = await this.departmentModel.findById(departmentId);
    if (!departmentExists) {
      throw badRequestException('Department not found');
    }

    const designation = await this.designationModel.create({
      designationName,
      departmentId,
    });
    if (!designation) {
      throw badRequestException('Designation not created');
    }

    return designation;
  }

  async edit(editDesignationDto: editDesignationDto, id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Designation id is not valid');
    }

    let { designationName, departmentId } = editDesignationDto;

    if (designationName) {
      const designationExists = await this.designationModel.exists({
        designationName,
      });
      if (designationExists) {
        throw badRequestException('Designation already exists');
      }
    }

    if (departmentId) {
      const departmentExists =
        await this.departmentModel.findById(departmentId);

      if (!departmentExists) {
        throw badRequestException('Department not found');
      }
    }

    const editDesignation = await this.designationModel.findByIdAndUpdate(
      id,
      {
        designationName,
        departmentId,
      },
      { new: true },
    );
    if (!editDesignation) {
      throw notFoundException('Designation not found');
    }

    return editDesignation;
  }

  async getSingle(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel
      .findById(id)
      .populate('departmentId');
    if (!designation) {
      throw notFoundException('Designation not found');
    }

    return designation;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } =
      await getPagination(
        page,
        limit,
        this.designationModel,
        search,
        'designationName',
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
    if (!isValidMongoId(id)) {
      throw badRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findByIdAndDelete(id);
    if (!designation) {
      throw notFoundException('Designation not found');
    }

    return designation;
  }
}
