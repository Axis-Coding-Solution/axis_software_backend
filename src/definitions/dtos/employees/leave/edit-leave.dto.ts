import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class EditLeaveDto {
  @IsMongoId({ message: 'Leave type is not valid' })
  @IsString()
  @IsOptional()
  leaveType?: Types.ObjectId;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  from?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  to?: Date;

  @IsNumber()
  @IsOptional()
  noOfDays?: Number;

  @IsString()
  @IsOptional()
  reason?: String;
}
