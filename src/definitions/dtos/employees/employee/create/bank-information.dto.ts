import { IsOptional, IsString } from 'class-validator';

export class BankInformationDto {
  @IsString()
  @IsOptional()
  bankName?: String;

  @IsString()
  @IsOptional()
  branchName?: String;

  @IsString()
  @IsOptional()
  bankAccountNumber?: String;

  @IsString()
  @IsOptional()
  ifscCode?: String;

  @IsString()
  @IsOptional()
  panNumber?: String;
}
