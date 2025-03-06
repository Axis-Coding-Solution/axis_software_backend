import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FamilyInformationDto {
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsString()
  @IsNotEmpty()
  relationship: String;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  phone: String;
}
