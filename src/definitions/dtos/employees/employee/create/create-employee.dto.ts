import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
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
import { PersonalInformationDto } from './personal-information.dto';
import { EmergencyContactDto } from './emergency-contact.dto';
import { BankInformationDto } from './bank-information.dto';
import { FamilyInformationDto } from './family-information.dto';
import { EducationInformationDto } from './education-information.dto';
import { ExperienceInformationDto } from './experience-information.dto';

export class CreateEmployeeDto {
  profileImage: String;

  @IsString()
  @IsNotEmpty()
  firstName: String;

  @IsString()
  @IsNotEmpty()
  lastName: String;

  @IsString()
  @IsNotEmpty()
  userName: String;

  @IsEmail()
  @IsNotEmpty()
  email: String;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsNotEmpty()
  password: String;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsNotEmpty()
  confirmPassword: String;

  //* this id will assign by company to employee
  @IsString()
  @IsOptional()
  employeeId?: String;

  @IsNotEmpty()
  @Type(() => Date)
  @IsNotEmpty()
  joiningDate: Date;

  @IsString()
  @IsOptional()
  phone?: String;

  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'Company is required' })
  companyId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'Department is required' })
  departmentId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'Designation is required' })
  designationId: Types.ObjectId;

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
  @Type(() => PersonalInformationDto)
  personalInformation?: PersonalInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergencyContact?: EmergencyContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BankInformationDto)
  bankInformation?: BankInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FamilyInformationDto)
  familyInformation?: FamilyInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EducationInformationDto)
  educationInformation?: EducationInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExperienceInformationDto)
  experienceInformation?: ExperienceInformationDto;
}
