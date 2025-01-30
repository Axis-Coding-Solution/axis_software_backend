import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { Company } from 'src/schemas/commons/company';
import { Department } from 'src/schemas/employees/department';
import { Designation } from 'src/schemas/employees/designation';

export class createEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsDate()
  @IsNotEmpty()
  joiningDate: Date;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @IsMongoId({ message: 'Company id is not valid' })
  companyId: string | Types.ObjectId | Company;

  @IsNotEmpty()
  @IsMongoId({ message: 'Department id is not valid' })
  departmentId: string | Types.ObjectId | Department;

  @IsNotEmpty()
  @IsMongoId({ message: 'Designation id is not valid' })
  designationId: string | Types.ObjectId | Designation;
}
