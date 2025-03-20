import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditEducationInformationDto {
  @IsString()
  @IsOptional()
  institution?: String;

  @IsString()
  @IsOptional()
  startDate?: String;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsString()
  @IsOptional()
  degree?: String;

  @IsString()
  @IsOptional()
  grade?: String;
}
