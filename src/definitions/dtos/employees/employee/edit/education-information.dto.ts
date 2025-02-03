import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditEducationInformationDto {
  @IsString()
  @IsOptional()
  institution?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsString()
  @IsOptional()
  degree?: string;

  @IsString()
  @IsOptional()
  grade?: string;
}
