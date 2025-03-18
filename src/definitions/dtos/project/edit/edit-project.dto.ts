import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { Priority, RateType } from 'src/schemas/enums/project';

export class EditProjectDto {
  @IsString()
  @IsOptional()
  projectName?: String;

  @IsMongoId()
  @IsString()
  @IsOptional()
  clientId?: Types.ObjectId;

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
  rate?: Number;

  @IsEnum(RateType)
  @IsOptional()
  rateType?: String;

  @IsEnum(Priority)
  @IsOptional()
  priority?: String;

  @IsMongoId()
  @IsString()
  @IsOptional()
  projectLeader?: Types.ObjectId;

  @IsString()
  @IsOptional()
  description?: String;

  files?: String[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  teamMembers?: Types.ObjectId[];
}
