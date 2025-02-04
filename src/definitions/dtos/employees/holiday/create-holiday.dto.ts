import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateHolidayDto {
  @IsString()
  @IsNotEmpty()
  holidayName: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  holidayDate: Date;
}
