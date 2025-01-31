import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createEmployeeDto,
  editEmployeeDto,
} from 'src/definitions/dtos/employees/employee';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/commons/company';
import {
  DEPARTMENT_MODEL,
  DepartmentDocument,
} from 'src/schemas/employees/department';
import {
  DESIGNATION_MODEL,
  DesignationDocument,
} from 'src/schemas/employees/designation';
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
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,

    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<CompanyDocument>,

    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<DepartmentDocument>,

    @InjectModel(DESIGNATION_MODEL)
    private readonly designationModel: Model<DesignationDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
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

    if (password && confirmPassword) {
      passwordExistInDto = true;
    }

    if (passwordExistInDto) {
      if (password !== confirmPassword) {
        passwordExistInDto = false;
        throw badRequestException(
          'Password and confirm password does not match',
        );
      }
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
      const companyExist = await this.companyModel.exists({ _id: companyId });
      if (!companyExist) {
        throw notFoundException('Company not found');
      }
    }

    const departmentExist = await this.departmentModel.exists({
      _id: departmentId,
    });
    if (!departmentExist) {
      throw notFoundException('Department not found');
    }

    const designationExist = await this.designationModel.exists({
      _id: designationId,
    });
    if (!designationExist) {
      throw notFoundException('Designation not found');
    }

    const employee = await this.employeeModel.create({
      ...createEmployeeDto,
      password: passwordHash,
    });
    if (!employee) {
      throw badRequestException('Employee not created');
    }

    const makeUserOfEmployee = await this.userModel.create({
      userName: employee.userName,
      email: employee.email,
      password: passwordHash,
      role: 'employee',
      employeeId: employee._id,
    });
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', makeUserOfEmployee);
    if (!makeUserOfEmployee) {
      throw badRequestException('User not created');
    }

    return employee;
  }

  async edit(editEmployeeDto: editEmployeeDto, id: string) {
    console.log("🚀 ~ EmployeeService ~ edit ~ editEmployeeDto:", editEmployeeDto)
    const {
      password,
      confirmPassword,
      userName,
      companyId,
      departmentId,
      designationId,
    } = editEmployeeDto;
    let passwordExistInDto = false;

    if (password && confirmPassword) {
      passwordExistInDto = true;
    }

    if (passwordExistInDto) {
      if (password !== confirmPassword) {
        passwordExistInDto = false;
        throw badRequestException(
          'Password and confirm password does not match',
        );
      }
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
      const companyExist = await this.companyModel.exists({ _id: companyId });
      if (!companyExist) {
        throw notFoundException('Company not found');
      }
    }

    if (departmentId) {
      const departmentExist = await this.departmentModel.exists({
        _id: departmentId,
      });
      if (!departmentExist) {
        throw notFoundException('Department not found');
      }
    }

    if (designationId) {
      const designationExist = await this.designationModel.exists({
        _id: designationId,
      });
      if (!designationExist) {
        throw notFoundException('Designation not found');
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
