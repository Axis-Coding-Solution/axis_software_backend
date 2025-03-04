import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOvertimeDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'Employee id is not valid' })
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  overtimeDate: Date;

  @IsNotEmpty()
  @IsNumber()
  overtimeHours: Number;

  @IsNotEmpty()
  @IsString()
  description: String;
}
