import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/schemas/commons/user';
import { Currency } from 'src/schemas/enums/common';
import {
  communicationChannels,
  Priority,
  ProjectStatus,
  ProjectType,
  RateType,
} from 'src/schemas/enums/project';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: String;

  @IsEnum(ProjectType)
  @IsNotEmpty()
  projectType: String;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  clientId: String | Types.ObjectId | User;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  rate: number;

  @IsEnum(Currency)
  @IsOptional()
  currency: String;

  @IsEnum(RateType)
  @IsNotEmpty()
  rateType?: String;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: String;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  projectLeader: String | Types.ObjectId | User;

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsNotEmpty()
  teamId: String[] | Types.ObjectId[] | User[];

  @IsString()
  @IsNotEmpty()
  description: String;

  @IsString({ each: true })
  @IsOptional()
  files?: String[];

  @IsEnum(ProjectStatus)
  @IsOptional()
  projectStatus?: String;

  @IsString({ each: true })
  @IsOptional()
  tags?: String[];

  @IsString({ each: true })
  @IsOptional()
  technologyStack?: String[];

  @IsString({ each: true })
  @IsOptional()
  repositories?: String[];

  @IsEnum(communicationChannels)
  @IsString({ each: true })
  @IsOptional()
  communicationChannels?: communicationChannels[];

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsOptional()
  Stakeholders?: String[] | Types.ObjectId[] | User[];
}
