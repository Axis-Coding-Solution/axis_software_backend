import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHolidayDto {
  @IsString()
  @IsNotEmpty()
  holidayName: String;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  holidayDate: Date;

  @IsString()
  @IsOptional()
  day?: any;
}
