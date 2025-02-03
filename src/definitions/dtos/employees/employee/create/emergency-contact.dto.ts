import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmergencyContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  relationship: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  @IsOptional()
  phone2?: string;
}
