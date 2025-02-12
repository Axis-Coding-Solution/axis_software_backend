import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Department, DEPARTMENT_MODEL } from '../department/department.schema';
import { Types } from 'mongoose';
import {
  Designation,
  DESIGNATION_MODEL,
} from '../designation/designation.schema';
import { COMPANY_MODEL } from 'src/schemas/commons/company';
import { Role } from 'src/schemas/constants';
import { Gender } from 'src/schemas/enums/common';
import {
  PersonalInformation,
  personalInformationSchema,
} from './personal-information.schema';
import {
  EmergencyContact,
  emergencyContactSchema,
} from './emergency-contact.schema';
import {
  bankInformation,
  bankInformationSchema,
} from './bank-information.schema';
import {
  FamilyInformation,
  familyInformationSchema,
} from './family-information.schema';
import {
  EducationInformation,
  educationInformationSchema,
} from './education-information.schema';
import {
  ExperienceInformation,
  experienceInformationSchema,
} from './experience-information.schema';

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
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

  @Prop()
  birthday?: Date;

  @Prop({ required: true })
  address: String;

  @Prop({
    type: String,
    enum: Object.keys(Gender),
    immutable: true,
    required: true,
  })
  gender: Gender;

  @Prop({ type: Types.ObjectId, ref: 'employee' })
  reportsTo: string | Types.ObjectId | Employee;

  @Prop({ required: true })
  state: String;

  @Prop({ required: true })
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
