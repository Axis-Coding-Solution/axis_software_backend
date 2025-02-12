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
  profileImage: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsOptional()
  password: string;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsOptional()
  confirmPassword: string;

  @IsOptional()
  @Type(() => Date)
  @IsOptional()
  joiningDate: Date;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsMongoId({ message: 'Company id is not valid' })
  companyId: string | Types.ObjectId | Company;

  @IsOptional()
  @IsMongoId({ message: 'Department id is not valid' })
  departmentId: string | Types.ObjectId | Department;

  @IsOptional()
  @IsMongoId({ message: 'Designation id is not valid' })
  designationId: string | Types.ObjectId | Designation;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthday?: Date;

  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsMongoId({ message: 'reportsTo id is not valid' })
  @IsOptional()
  reportsTo: string | Types.ObjectId;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  pinCode?: string;

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
