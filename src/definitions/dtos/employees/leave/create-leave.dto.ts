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
import { LeaveType } from 'src/schemas/enums/employees/leave';

export class CreateLeaveDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(LeaveType, { message: 'Type is invalid' })
  leaveType: String;

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
