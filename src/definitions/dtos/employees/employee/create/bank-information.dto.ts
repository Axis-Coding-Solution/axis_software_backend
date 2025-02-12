import { IsOptional, IsString } from 'class-validator';

export class BankInformationDto {
  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  branchName?: string;

  @IsString()
  @IsOptional()
  bankAccountNumber?: string;

  @IsString()
  @IsOptional()
  ifscCode?: string;

  @IsString()
  @IsOptional()
  panNumber?: string;
}
