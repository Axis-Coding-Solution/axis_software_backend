import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Department, DEPARTMENT_MODEL } from '../department/department.schema';
import { Types } from 'mongoose';
import { Designation, DESIGNATION_MODEL } from '../designation/designation.schema';

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

  @Prop({ required: true })
  phoneNumber: String;

  @Prop()
  company: String;

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL, required: true })
  departmentId: string | Types.ObjectId | Department;

  @Prop({ type: Types.ObjectId, ref: DESIGNATION_MODEL, required: true })
  designationId: string | Types.ObjectId | Designation;
}

export type EmployeeDocument = Employee & Document;
export const employeeSchema = SchemaFactory.createForClass(Employee);
export const EMPLOYEE_MODEL = Employee.name;
