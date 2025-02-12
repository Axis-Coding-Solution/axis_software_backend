import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COMPANY_MODEL, companySchema } from 'src/schemas/commons/company';
import {
  DEPARTMENT_MODEL,
  departmentSchema,
} from 'src/schemas/employees/department';
import {
  DESIGNATION_MODEL,
  designationSchema,
} from 'src/schemas/employees/designation';
import { EMPLOYEE_MODEL, employeeSchema } from 'src/schemas/employees/employee';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EMPLOYEE_MODEL, schema: employeeSchema },
      { name: COMPANY_MODEL, schema: companySchema },
      { name: DEPARTMENT_MODEL, schema: departmentSchema },
      { name: DESIGNATION_MODEL, schema: designationSchema },
      { name: USER_MODEL, schema: userSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
