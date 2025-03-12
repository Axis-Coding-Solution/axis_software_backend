import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';

export class EditClientDto {
  @IsString()
  @IsOptional()
  firstName?: String;

  @IsString()
  @IsOptional()
  lastName?: String;

  @IsString()
  @IsOptional()
  userName?: String;

  @IsEmail()
  @IsOptional()
  email?: String;

  @IsString()
  @IsOptional()
  password?: String;

  @IsString()
  @IsOptional()
  confirmPassword?: String;

  //* this id will assign to client by admin/company
  @IsString()
  @IsOptional()
  clientId?: String;

  @IsString()
  @IsOptional()
  phone?: String;

  @IsString()
  @IsOptional()
  companyName?: String;
}
