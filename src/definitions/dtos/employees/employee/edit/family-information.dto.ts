import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditFamilyInformationDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  relationship: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  phone: string;
}
