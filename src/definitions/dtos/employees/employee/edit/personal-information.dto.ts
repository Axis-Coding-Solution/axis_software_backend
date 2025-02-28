import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MaritalStatus } from 'src/schemas/enums/employee';

export class EditPersonalInformationDto {
  @IsString()
  @IsOptional()
  passportNo?: String;

  @IsString()
  @IsOptional()
  passportExpDate?: String;

  @IsString()
  @IsOptional()
  tel?: String;

  @IsString()
  @IsOptional()
  nationality: String;

  @IsString()
  @IsOptional()
  religion?: String;

  @IsEnum(MaritalStatus)
  @IsOptional()
  maritalStatus: MaritalStatus;

  @IsString()
  @IsOptional()
  employmentOfSpouse?: String;

  @IsString()
  @IsOptional()
  noOfChildren?: String;
}
