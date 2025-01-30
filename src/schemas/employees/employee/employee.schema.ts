import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Department, DEPARTMENT_MODEL } from '../department/department.schema';
import { Types } from 'mongoose';
import {
  Designation,
  DESIGNATION_MODEL,
} from '../designation/designation.schema';
import { COMPANY_MODEL } from 'src/schemas/commons/company';
import { Role } from 'src/schemas/constants';

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: String;

  @Prop()
  lastName: String;

  @Prop({ required: true })
  userName: String;

  @Prop({ required: true })
  email: String;

  @Prop()
  password: String;

  @Prop()
  confirmPassword: String;

  @Prop({ required: true })
  joiningDate: Date;

  @Prop({ required: true })
  phone: String;

  @Prop({ type: Types.ObjectId, ref: COMPANY_MODEL, required: true })
  companyId: String;

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL, required: true })
  departmentId: string | Types.ObjectId | Department;

  @Prop({ type: Types.ObjectId, ref: DESIGNATION_MODEL, required: true })
  designationId: string | Types.ObjectId | Designation;

  @Prop({
    type: String,
    enum: Object.keys(Role),
    immutable: true,
    default: 'employee',
  })
  role: Role;
}

export type EmployeeDocument = Employee & Document;
export const employeeSchema = SchemaFactory.createForClass(Employee);
export const EMPLOYEE_MODEL = Employee.name;
