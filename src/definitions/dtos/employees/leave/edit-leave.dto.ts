import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { LeaveType } from 'src/schemas/enums/employees/leave';

export class EditLeaveDto {
  @IsString()
  @IsEnum(LeaveType, { message: 'Type is invalid' })
  @IsOptional()
  leaveType?: String;

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
