import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Department, DEPARTMENT_MODEL } from '../department/department.schema';
import { Types } from 'mongoose';
import { Designation, DESIGNATION_MODEL } from '../designation/designation.schema';
import { COMPANY_MODEL } from 'src/schemas/commons/company';
import { Role } from 'src/schemas/constants';
import { Gender } from 'src/schemas/enums/common';
import { PersonalInformation, personalInformationSchema } from './personal-information.schema';
import { EmergencyContact, emergencyContactSchema } from './emergency-contact.schema';
import { bankInformation, bankInformationSchema } from './bank-information.schema';
import { FamilyInformation, familyInformationSchema } from './family-information.schema';
import { EducationInformation, educationInformationSchema } from './education-information.schema';
import {
  ExperienceInformation,
  experienceInformationSchema,
} from './experience-information.schema';
import { User } from 'src/schemas/commons/user';

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  profileImage: String;

  @Prop({ required: true })
  firstName: String;

  @Prop()
  lastName?: String;

  @Prop({ required: true, unique: true })
  userName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  password: String;

  @Prop({ required: true })
  confirmPassword: String;

  //* this id will assign by company to employee
  @Prop()
  employeeId?: String;

  @Prop({ required: true })
  joiningDate: Date;

  @Prop({ required: true })
  phone: String;

  @Prop({ type: Types.ObjectId, ref: COMPANY_MODEL, required: true })
  companyId: String;

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL, required: true })
  departmentId: String | Types.ObjectId | Department;

  @Prop({ type: Types.ObjectId, ref: DESIGNATION_MODEL, required: true })
  designationId: String | Types.ObjectId | Designation;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: String | Types.ObjectId | User;

  @Prop({
    type: String,
    enum: Object.keys(Role),
    immutable: true,
    default: 'employee',
  })
  role: Role;

  @Prop()
  birthday?: Date;

  @Prop()
  address: String;

  @Prop({
    type: String,
    enum: Object.keys(Gender),
    immutable: true,
  })
  gender: Gender;

  @Prop({ type: Types.ObjectId, ref: 'employee' })
  reportsTo: String | Types.ObjectId | Employee;

  @Prop()
  state: String;

  @Prop()
  country: String;

  @Prop()
  pinCode?: String;

  @Prop({ type: personalInformationSchema })
  personalInformation: PersonalInformation;

  @Prop({ type: emergencyContactSchema })
  emergencyContact: EmergencyContact;

  @Prop({ type: bankInformationSchema })
  bankInformation: bankInformation;

  @Prop({ type: familyInformationSchema })
  familyInformation: FamilyInformation;

  @Prop({ type: educationInformationSchema })
  educationInformation: EducationInformation;

  @Prop({ type: experienceInformationSchema })
  experienceInformation: ExperienceInformation;
}

export type EmployeeDocument = Employee & Document;
export const employeeSchema = SchemaFactory.createForClass(Employee);
export const EMPLOYEE_MODEL = Employee.name;
