import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createDesignationDto,
  editDesignationDto,
} from 'src/defination/dtos/designation';
import {
  DesignationDocument,
  DESIGNATION_MODEL,
  DepartmentDocument,
  DEPARTMENT_MODEL,
} from 'src/schemas';
import {
  badRequestException,
  isValidMongoId,
  notFoundException,
} from 'src/utils';

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
    if (!(designationName || departmentId)) {
      throw badRequestException('Designation name and Department is required');
    }

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
    if (isValidMongoId(id) === false) {
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
    if (isValidMongoId(id) === false) {
      throw badRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findById(id);
    if (!designation) {
      throw notFoundException('Designation not found');
    }

    return designation;
  }

  async getAll() {
    const designations = await this.designationModel.find();
    if (designations.length === 0) {
      throw notFoundException('Designations not found');
    }

    return designations;
  }

  async delete(id: string) {
    if (isValidMongoId(id) === false) {
      throw badRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findByIdAndDelete(id);
    if (!designation) {
      throw notFoundException('Designation not found');
    }

    return designation;
  }
}
