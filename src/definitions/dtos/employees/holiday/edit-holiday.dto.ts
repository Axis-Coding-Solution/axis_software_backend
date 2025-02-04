import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditHolidayDto {
  @IsString()
  @IsOptional()
  holidayName?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  holidayDate?: Date;
}
