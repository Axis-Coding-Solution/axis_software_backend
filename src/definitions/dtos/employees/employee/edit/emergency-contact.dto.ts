import { IsOptional, IsString } from 'class-validator';

export class EditEmergencyContactDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  relationship: string;

  @IsString()
  @IsOptional()
  phone1: string;

  @IsString()
  @IsOptional()
  phone2?: string;
}
