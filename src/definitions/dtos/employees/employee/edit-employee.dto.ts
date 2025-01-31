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
import { PersonalInformationDto } from './personal-information.dto';
import { EmergencyContactDto } from './emergency-contact.dto';
import { BankInformationDto } from './bank-information.dto';
import { familyInformationDto } from './family-information.dto';
import { educationInformationDto } from './education-information.dto';
import { ExperienceInformationDto } from './experience-information.dto';

export class editEmployeeDto {
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
