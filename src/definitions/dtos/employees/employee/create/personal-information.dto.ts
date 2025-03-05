import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MaritalStatus } from 'src/schemas/enums/employees/employee/marital-status.enum';

export class PersonalInformationDto {
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
  @IsNotEmpty()
  nationality: String;

  @IsString()
  @IsOptional()
  religion?: String;

  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsString()
  @IsOptional()
  employmentOfSpouse?: String;

  @IsString()
  @IsOptional()
  noOfChildren?: String;
}
