import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';
import { LeaveType } from 'src/schemas/enums/employees/leave';

export class CreateLeaveSettingDto {
  @IsString()
  @IsNotEmpty()
  policyName: String;

  @Min(1)
  @Max(30)
  @IsNumber(undefined, { message: 'Days must be a number' })
  @IsNotEmpty()
  noOfDays: Number;

  @IsEnum(LeaveType, { message: 'Type is invalid' })
  @IsString()
  @IsNotEmpty()
  type: LeaveType;

  @IsBoolean()
  @IsOptional()
  isCustomPolicy?: Boolean;

  @ValidateIf((dto) => dto.isCustomPolicy === true)
  @IsMongoId({ each: true })
  @IsNotEmpty()
  employeeIds: Types.ObjectId[];
}
