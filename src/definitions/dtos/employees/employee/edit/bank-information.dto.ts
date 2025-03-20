import { IsOptional, IsString } from 'class-validator';

export class EditBankInformationDto {
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
