import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/schemas/constants/role-constants';
import { AddressDto } from './address.dto';

export class RegisterUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsOptional()
  age?: string;

  @IsString()
  phone?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsString({ each: true })
  @IsOptional()
  social?: string[];

  @IsOptional()
  address: AddressDto;
}
