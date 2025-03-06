import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Company } from 'src/schemas/commons/company';
import { Role } from 'src/schemas/constants';
import { Department } from 'src/schemas/employees/department';
import { Designation } from 'src/schemas/employees/designation';
import { Gender } from 'src/schemas/enums/common';
import { EditBankInformationDto } from './bank-information.dto';
import { EditEducationInformationDto } from './education-information.dto';
import { EditEmergencyContactDto } from './emergency-contact.dto';
import { EditExperienceInformationDto } from './experience-information.dto';
import { EditFamilyInformationDto } from './family-information.dto';
import { EditPersonalInformationDto } from './personal-information.dto';

export class EditEmployeeDto {
  profileImage: String;

  @IsString()
  @IsOptional()
  firstName: String;

  @IsString()
  @IsOptional()
  lastName: String;

  @IsString()
  @IsOptional()
  userName: String;

  @IsEmail()
  @IsOptional()
  email: String;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsOptional()
  password: String;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsOptional()
  confirmPassword: String;

  //* this is will assign by company to employee
  @IsString()
  @IsOptional()
  employeeId?: String;

  @IsOptional()
  @Type(() => Date)
  @IsOptional()
  joiningDate: Date;

  @IsString()
  @IsOptional()
  phone?: String;

  @IsOptional()
  @IsMongoId({ message: 'Company id is not valid' })
  companyId: String | Types.ObjectId | Company;

  @IsOptional()
  @IsMongoId({ message: 'Department id is not valid' })
  departmentId: String | Types.ObjectId | Department;

  @IsOptional()
  @IsMongoId({ message: 'Designation id is not valid' })
  designationId: String | Types.ObjectId | Designation;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthday?: Date;

  @IsString()
  @IsOptional()
  address: String;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsMongoId({ message: 'reportsTo id is not valid' })
  @IsOptional()
  reportsTo: String | Types.ObjectId;

  @IsString()
  @IsOptional()
  state: String;

  @IsString()
  @IsOptional()
  country: String;

  @IsString()
  @IsOptional()
  pinCode?: String;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditPersonalInformationDto)
  personalInformation?: EditPersonalInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditEmergencyContactDto)
  emergencyContact?: EditEmergencyContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditBankInformationDto)
  bankInformation?: EditBankInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditFamilyInformationDto)
  familyInformation?: EditFamilyInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditEducationInformationDto)
  educationInformation?: EditEducationInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EditExperienceInformationDto)
  experienceInformation?: EditExperienceInformationDto;
}
