import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditFamilyInformationDto {
  @IsString()
  @IsOptional()
  name: String;

  @IsString()
  @IsOptional()
  relationship: String;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  phone: String;
}
