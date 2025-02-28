import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmergencyContactDto {
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsString()
  @IsNotEmpty()
  relationship: String;

  @IsString()
  @IsNotEmpty()
  phone1: String;

  @IsString()
  @IsOptional()
  phone2?: String;
}
