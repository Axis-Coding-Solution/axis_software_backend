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
import { Employee } from 'src/schemas/employees/employee';
import { Priority, RateType } from 'src/schemas/enums/project';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: String;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  clientId: Types.ObjectId;

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
  rate: Number;

  @IsEnum(RateType)
  @IsNotEmpty()
  rateType?: String;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: String;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  projectLeader: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  description: String;

  @IsString({ each: true })
  @IsOptional()
  files?: String[];

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsOptional()
  teamMembers?: String[] | Types.ObjectId[] | Employee[];
}
