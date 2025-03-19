import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class editTimesheetDto {
  @IsNotEmpty({ message: 'Project id is required' })
  @IsString()
  @IsMongoId({ message: 'Project id is not valid' })
  @IsOptional()
  projectId?: Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  date?: String;

  @IsNumber()
  @IsOptional()
  hours?: Number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: String;

  @IsString()
  @IsOptional()
  employeeId?: Types.ObjectId;
}
