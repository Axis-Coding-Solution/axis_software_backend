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

export class CreateLeaveDto {
  @IsMongoId({ message: 'Leave type is not valid' })
  @IsString()
  @IsNotEmpty()
  leaveType: Types.ObjectId;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  to: Date;

  @IsNumber()
  @IsOptional()
  noOfDays?: Number;

  @IsNotEmpty()
  @IsString()
  reason: String;

  @IsNotEmpty()
  @IsString()
  @IsMongoId({ message: 'Employee id is not valid' })
  @IsOptional()
  employeeId?: Types.ObjectId;
}
