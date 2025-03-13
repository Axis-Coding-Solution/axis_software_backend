import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/commons/company';
import { DEPARTMENT_MODEL, DepartmentDocument } from 'src/schemas/employees/department';
import { DESIGNATION_MODEL, DesignationDocument } from 'src/schemas/employees/designation';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { badRequestException, conflictException, notFoundException } from 'src/utils';
import * as bcrypt from 'bcrypt';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { CreateEmployeeDto } from 'src/definitions/dtos/employees/employee/create';
import { EditEmployeeDto } from 'src/definitions/dtos/employees/employee/edit';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

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

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { password, confirmPassword, userName, companyId, departmentId, designationId } =
      createEmployeeDto;

    if (!password || !confirmPassword) return null;

    if (password !== confirmPassword) {
      throw badRequestException('Password and confirm password does not match');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);
    createEmployeeDto.password = passwordHash;
    createEmployeeDto.confirmPassword = passwordHash;

    await Promise.all([
      userName ? await existsHelper(userName, 'userName', this.employeeModel) : null,
      companyId ? await getSingleHelper(companyId, COMPANY_MODEL, this.companyModel) : null,
      departmentId
        ? await getSingleHelper(departmentId, DEPARTMENT_MODEL, this.departmentModel)
        : null,
      designationId
        ? await getSingleHelper(designationId, DESIGNATION_MODEL, this.designationModel)
        : null,
    ]);

    const employee = await createHelper(createEmployeeDto, EMPLOYEE_MODEL, this.employeeModel);

    //? interacting with user model
    const updateData: object = {
      userName: employee.userName,
      email: employee.email,
      password: passwordHash,
      role: 'employee',
      employeeId: employee._id,
    };

    const user = await createHelper(updateData, USER_MODEL, this.userModel);
    const updatedEmployee = await editHelper(
      employee._id,
      { userId: user._id },
      EMPLOYEE_MODEL,
      this.employeeModel,
    );

    return updatedEmployee;
  }

  async edit(editEmployeeDto: EditEmployeeDto, id: Types.ObjectId) {
    const { userName, companyId, departmentId, designationId } = editEmployeeDto;

    await Promise.all([
      userName ? await existsHelper(userName, 'userName', this.employeeModel, id) : null,
      companyId ? await getSingleHelper(companyId, COMPANY_MODEL, this.companyModel) : null,
      departmentId
        ? await getSingleHelper(departmentId, DEPARTMENT_MODEL, this.departmentModel)
        : null,
      designationId
        ? await getSingleHelper(designationId, DESIGNATION_MODEL, this.designationModel)
        : null,
    ]);

    const employee = await editHelper(id, editEmployeeDto, EMPLOYEE_MODEL, this.employeeModel);

    return employee;
  }

  async getSingle(id: Types.ObjectId) {
    const employee = await getSingleHelper(id, EMPLOYEE_MODEL, this.employeeModel);

    return employee;
  }

  async getAll(
    page: string,
    limit: string,
    employeeName: string,
    employeeId: string,
    designationName: string,
  ) {
    let filters = {};
    employeeId ? (filters['employeeId'] = { $regex: employeeId, $options: 'i' }) : null;

    if (designationName) {
      const designationIds = await this.designationModel
        .find({ designationName: { $regex: designationName, $options: 'i' } })
        .distinct('_id')
        .exec();

      console.log('🚀 ~ EmployeeService ~ designationIds:', designationIds);
      filters['designationId'] = { $in: designationIds };
    }
    console.log('🚀 ~ EmployeeService ~ filters:', filters);

    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.employeeModel,
      employeeName,
      'firstName',
      'departmentId designationId',
      filters,
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
    const employee = await deleteHelper(id, EMPLOYEE_MODEL, this.employeeModel);
    //? delete user associated to employee
    await deleteHelper(employee?.userId, USER_MODEL, this.userModel);

    return employee;
  }
}
