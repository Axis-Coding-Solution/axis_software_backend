import { IsOptional, IsString } from 'class-validator';

export class EditEmergencyContactDto {
  @IsString()
  @IsOptional()
  name: String;

  @IsString()
  @IsOptional()
  relationship: String;

  @IsString()
  @IsOptional()
  phone1: String;

  @IsString()
  @IsOptional()
  phone2?: String;
}
