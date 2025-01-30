import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createEmployeeDto,
  EditEmployeeDto,
} from 'src/definitions/dtos/employees/employee';
import { COMPANY_MODEL } from 'src/schemas/commons/company';
import { DEPARTMENT_MODEL } from 'src/schemas/employees/department';
import { DESIGNATION_MODEL } from 'src/schemas/employees/designation';
import {
  EMPLOYEE_MODEL,
  EmployeeDocument,
} from 'src/schemas/employees/employee';
import {
  badRequestException,
  conflictException,
  isValidMongoId,
  notFoundException,
} from 'src/util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,

    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<EmployeeDocument>,

    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<EmployeeDocument>,

    @InjectModel(DESIGNATION_MODEL)
    private readonly designationModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: createEmployeeDto) {
    const {
      password,
      confirmPassword,
      userName,
      companyId,
      departmentId,
      designationId,
    } = createEmployeeDto;

    let passwordExistInDto = false;
    // if (password && confirmPassword && password !== confirmPassword) {
    //   throw badRequestException('Password and confirm password does not match');
    // }
    if (password && confirmPassword) {
      passwordExistInDto = true;
    }

    if (passwordExistInDto) {
      if (password !== confirmPassword) {
        throw badRequestException(
          'Password and confirm password does not match',
        );
      }
      passwordExistInDto = false;
    }

    let passwordHash = null;
    if (passwordExistInDto) {
      const salt = bcrypt.genSaltSync(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const employeeExist = await this.employeeModel.exists({ userName });
    if (employeeExist) {
      throw conflictException('Employee already exist');
    }

    if (companyId) {
      const companyExist = await this.companyModel.exists({ companyId });
      if (!companyExist) {
        throw badRequestException('Company not found');
      }
    }

    const departmentExist = await this.departmentModel.exists({ departmentId });
    if (!departmentExist) {
      throw badRequestException('Department not found');
    }

    const designationExist = await this.designationModel.exists({
      designationId,
    });
    if (!designationExist) {
      throw badRequestException('Designation not found');
    }

    const employee = await this.employeeModel.create({
      ...createEmployeeDto,
      password: passwordHash,
    });
    if (!employee) {
      throw badRequestException('Employee not created');
    }

    return employee;
  }

  async edit(editEmployeeDto: EditEmployeeDto, id: string) {
    const {
      password,
      confirmPassword,
      userName,
      companyId,
      departmentId,
      designationId,
    } = editEmployeeDto;
    if (password && confirmPassword && password !== confirmPassword) {
      throw badRequestException('Password and confirm password does not match');
    }

    const employeeExist = await this.employeeModel.exists({ userName });
    if (employeeExist) {
      throw conflictException('Employee already exist');
    }

    if (companyId) {
      const companyExist = await this.companyModel.exists({ companyId });
      if (!companyExist) {
        throw badRequestException('Company not found');
      }
    }

    if (departmentId) {
      const departmentExist = await this.departmentModel.exists({
        departmentId,
      });
      if (!departmentExist) {
        throw badRequestException('Department not found');
      }
    }

    if (designationId) {
      const designationExist = await this.designationModel.exists({
        designationId,
      });
      if (!designationExist) {
        throw badRequestException('Designation not found');
      }
    }

    const employee = await this.employeeModel.findByIdAndUpdate(
      id,
      editEmployeeDto,
      {
        new: true,
      },
    );
    if (!employee) {
      throw notFoundException('Employee not found');
    }

    return employee;
  }

  async getSingle(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Employee id is not valid');
    }

    const employee = await this.employeeModel.findById(id);
    if (!employee) {
      throw notFoundException('Employee not found');
    }

    return employee;
  }

  async getAll() {
    const employees = await this.employeeModel.find();
    if (employees.length === 0) {
      throw notFoundException('Employees not found');
    }

    return employees;
  }

  async delete(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Employee id is not valid');
    }

    const employee = await this.employeeModel.findByIdAndDelete(id);
    if (!employee) {
      throw notFoundException('Employee not found');
    }

    return employee;
  }
}
