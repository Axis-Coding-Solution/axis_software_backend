import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsMongoId, IsOptional, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/schemas/commons/user';
import { Currency } from 'src/schemas/enums/common';
import { Priority, ProjectStatus, ProjectType, RateType } from 'src/schemas/enums/project';

export class EditProjectDto {
  @IsString()
  @IsOptional()
  projectName?: String;

  @IsEnum(ProjectType)
  @IsOptional()
  projectType?: String;

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsOptional()
  clientId?: Types.ObjectId[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  rate?: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: String;

  @IsEnum(RateType)
  @IsOptional()
  rateType?: String;

  @IsEnum(Priority)
  @IsOptional()
  priority?: String;

  @IsMongoId()
  @IsString()
  @IsOptional()
  projectLeader?: String | Types.ObjectId | User;

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsOptional()
  teamId?: String[] | Types.ObjectId[] | User[];

  @IsString()
  @IsOptional()
  description?: String;

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

  @IsString({ each: true })
  @IsOptional()
  communicationChannels?: String[];

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsOptional()
  Stakeholders?: String[] | Types.ObjectId[] | User[];
}
