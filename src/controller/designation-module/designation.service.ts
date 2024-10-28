import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { isValidMongoId } from 'src/utils';

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
      throw new BadRequestException(
        'Designation name and Department is required',
      );
    }

    const designationExists = await this.designationModel.exists({
      designationName,
    });
    if (designationExists) {
      throw new BadRequestException('Designation already exists');
    }

    const departmentExists = await this.departmentModel.findById(departmentId);

    if (!departmentExists) {
      throw new BadRequestException('Department not found');
    }

    const designation = await this.designationModel.create({
      designationName,
      departmentId,
    });
    if (!designation) {
      throw new BadRequestException('Designation not created');
    }

    return designation;
  }

  async edit(editDesignationDto: editDesignationDto, id: string) {
    if (isValidMongoId(id) === false) {
      throw new BadRequestException('Designation id is not valid');
    }

    let { designationName, departmentId } = editDesignationDto;

    if (designationName) {
      const designationExists = await this.designationModel.exists({
        designationName,
      });
      if (designationExists) {
        throw new BadRequestException('Designation already exists');
      }
    }

    if (departmentId) {
      const departmentExists =
        await this.departmentModel.findById(departmentId);

      if (!departmentExists) {
        throw new BadRequestException('Department not found');
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
      throw new NotFoundException('Designation not found');
    }

    return editDesignation;
  }

  async getSingle(id: string) {
    if (isValidMongoId(id) === false) {
      throw new BadRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findById(id);
    if (!designation) {
      throw new NotFoundException('Designation not found');
    }

    return designation;
  }

  async getAll() {
    const designations = await this.designationModel.find();
    if (designations.length === 0) {
      throw new NotFoundException('Designations not found');
    }

    return designations;
  }

  async delete(id: string) {
    if (isValidMongoId(id) === false) {
      throw new BadRequestException('Designation id is not valid');
    }

    const designation = await this.designationModel.findByIdAndDelete(id);
    if (!designation) {
      throw new NotFoundException('Designation not found');
    }

    return designation;
  }
}
