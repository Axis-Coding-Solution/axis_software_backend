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
import { familyInformationDto } from './family-information.dto';
import { educationInformationDto } from './education-information.dto';
import { ExperienceInformationDto } from './experience-information.dto';

export class createEmployeeDto {
  profileImage: string;

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

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ValidateIf((dto) => dto !== undefined)
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  @Type(() => Date)
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

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  birthday?: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsMongoId({ message: 'reportsTo id is not valid' })
  @IsOptional()
  reportsTo: string | Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  pinCode?: string;

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
  @Type(() => familyInformationDto)
  familyInformation?: familyInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => educationInformationDto)
  educationInformation?: educationInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExperienceInformationDto)
  experienceInformation?: ExperienceInformationDto;
}
