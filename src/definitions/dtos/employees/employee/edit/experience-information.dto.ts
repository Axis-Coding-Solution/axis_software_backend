import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditExperienceInformationDto {
  @IsString()
  @IsOptional()
  companyName?: String;

  @IsString()
  @IsOptional()
  location?: String;

  @IsString()
  @IsOptional()
  designation?: String;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
