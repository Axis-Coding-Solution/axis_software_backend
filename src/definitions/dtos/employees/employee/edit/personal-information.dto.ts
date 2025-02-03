import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MaritalStatus } from 'src/schemas/enums/employee';

export class EditPersonalInformationDto {
  @IsString()
  @IsOptional()
  passportNo?: string;

  @IsString()
  @IsOptional()
  passportExpDate?: string;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsOptional()
  religion?: string;

  @IsEnum(MaritalStatus)
  @IsOptional()
  maritalStatus: MaritalStatus;

  @IsString()
  @IsOptional()
  employmentOfSpouse?: string;

  @IsString()
  @IsOptional()
  noOfChildren?: string;
}
