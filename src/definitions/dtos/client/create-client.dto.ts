import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  firstName: String;

  @IsString()
  @IsNotEmpty()
  lastName: String;

  @IsString()
  @IsNotEmpty()
  userName: String;

  @IsEmail()
  @IsNotEmpty()
  email: String;

  @IsString()
  @IsNotEmpty()
  password: String;

  @IsString()
  @IsNotEmpty()
  confirmPassword: String;

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
