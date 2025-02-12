import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MaritalStatus } from 'src/schemas/enums/employee';

export class PersonalInformationDto {
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
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsOptional()
  religion?: string;

  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsString()
  @IsOptional()
  employmentOfSpouse?: string;

  @IsString()
  @IsOptional()
  noOfChildren?: string;
}
