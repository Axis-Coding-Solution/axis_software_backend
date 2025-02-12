import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class ExperienceInformationDto {
  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
