import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class EditOvertimeDto {
  @IsMongoId({ message: 'Employee id is not valid' })
  @IsOptional()
  employeeId?: Types.ObjectId;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  overtimeDate?: Date;

  @IsNumber()
  @IsOptional()
  overtimeHours?: Number;

  @IsString()
  @IsOptional()
  description?: String;
}
