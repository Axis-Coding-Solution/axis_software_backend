import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DEPARTMENT_MODEL,
  DepartmentDocument,
} from 'src/schemas/department-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createDepartmentDto,
  editDepartmentDto,
} from 'src/defination/dtos/department';
import { isValidMongoId } from 'src/utils';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(createDepartmentDto: createDepartmentDto) {
    const { departmentName } = createDepartmentDto;
    if (!departmentName) {
      throw new BadRequestException('Department name is required');
    }

    const departmentExists = await this.departmentModel.exists({
      departmentName,
    });
    if (departmentExists) {
      throw new BadRequestException('Department already exists');
    }

    const department = await this.departmentModel.create({ departmentName });
    if (!department) {
      throw new BadRequestException('Department not created');
    }

    return department;
  }

  async edit(editDepartmentDto: editDepartmentDto, id: string) {
    if (isValidMongoId(id) === false) {
      throw new BadRequestException('Department id is not valid');
    }

    const { departmentName } = editDepartmentDto;
    if (!departmentName) {
      throw new BadRequestException('Department name is required');
    }

    const editDepartment = await this.departmentModel.findByIdAndUpdate(
      id,
      {
        departmentName,
      },
      { new: true },
    );
    if (!editDepartment) {
      throw new NotFoundException('Department not updated');
    }

    return editDepartment;
  }

  async getSingle(id: string) {
    if (isValidMongoId(id) === false) {
      throw new BadRequestException('Department id is not valid');
    }

    const department = await this.departmentModel.findById(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }

  async getAll() {
    const departments = await this.departmentModel.find();
    if (departments.length === 0) {
      throw new NotFoundException('Departments not found');
    }

    return departments;
  }

  async delete(id: string) {
    if (isValidMongoId(id) === false) {
      throw new BadRequestException('Department id is not valid');
    }

    const department = await this.departmentModel.findByIdAndDelete(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }
}
