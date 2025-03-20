import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateLeaveSettingDto {
  @IsString()
  @IsNotEmpty()
  policyName: String;

  @Min(1)
  @Max(30)
  @IsNumber(undefined, { message: 'Days must be a number' })
  @IsNotEmpty()
  noOfDays: Number;
}
