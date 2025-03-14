import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditLeaveSettingDto {
  @IsString()
  @IsOptional()
  policyName?: String;

  @IsNumber()
  @IsOptional()
  noOfDays?: Number;
}
