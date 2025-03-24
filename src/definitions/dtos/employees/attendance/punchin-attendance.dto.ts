import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMilitaryTime,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class PunchInDto {
  @IsBoolean()
  @IsNotEmpty()
  isPunch: Boolean;

  @IsMongoId({ message: 'Employee id is not valid' })
  @IsOptional()
  employeeId?: Types.ObjectId;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsString()
  @IsOptional()
  punchIn?: String;
}
