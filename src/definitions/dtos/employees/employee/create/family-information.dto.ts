import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FamilyInformationDto {
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
