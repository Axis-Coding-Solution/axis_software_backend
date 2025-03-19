import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class createTimesheetDto {
  @IsMongoId({ message: 'Project id is not valid' })
  @IsNotEmpty({ message: 'Project id is required' })
  @IsString()
  projectId: Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: String;

  @IsNumber()
  @IsNotEmpty()
  hours: number;

  @IsNotEmpty()
  @IsString()
  description: String;

  @IsString()
  @IsOptional()
  employeeId?: Types.ObjectId;
}
