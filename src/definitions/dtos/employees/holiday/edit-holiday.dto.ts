import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditHolidayDto {
  @IsString()
  @IsOptional()
  holidayName?: String;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  holidayDate?: Date;

  @IsString()
  @IsOptional()
  day?: any;
}
