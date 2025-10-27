import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createDesignationDto,
  editDesignationDto,
} from 'src/definitions/dtos/employees/designation';
import { DEPARTMENT_MODEL, DepartmentDocument } from 'src/schemas/employees/department';
import { DESIGNATION_MODEL, DesignationDocument } from 'src/schemas/employees/designation';
import { CustomBadRequestException, isValidMongoId, CustomNotFoundException } from 'src/utils';
import { getAllHelper } from 'src/utils/helper';

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
      throw CustomBadRequestException('Designation already exists');
    }

    const departmentExists = await this.departmentModel.findById(departmentId);
    if (!departmentExists) {
      throw CustomBadRequestException('Department not found');
    }

    const designation = await this.designationModel.create({
      designationName,
      departmentId,
    });
    if (!designation) {
      throw CustomBadRequestException('Designation not created');
    }

    return designation;
  }

  async edit(editDesignationDto: editDesignationDto, id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw CustomBadRequestException('Designation id is not valid');
    }

    let { designationName, departmentId } = editDesignationDto;

    if (designationName) {
      const designationExists = await this.designationModel.exists({
        designationName,
      });
      if (designationExists) {
        throw CustomBadRequestException('Designation already exists');
      }
    }

    if (departmentId) {
      const departmentExists = await this.departmentModel.findById(departmentId);

      if (!departmentExists) {
        throw CustomBadRequestException('Department not found');
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
      throw CustomNotFoundException('Designation not found');
    }

    return editDesignation;
  }

  async getSingle(id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw CustomBadRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findById(id).populate('departmentId');
    if (!designation) {
      throw CustomNotFoundException('Designation not found');
    }

    return designation;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.designationModel,
      search,
      'designationName',
      [
        {
          path: 'departmentId',
          select: 'departmentName -_id',
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
    if (!isValidMongoId(id)) {
      throw CustomBadRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findByIdAndDelete(id);
    if (!designation) {
      throw CustomNotFoundException('Designation not found');
    }

    return designation;
  }
}
