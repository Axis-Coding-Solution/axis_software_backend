import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  isEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ACCOUNT_TYPE } from 'src/constants/accountConstants';
import { AddressDto } from './addressDto';

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

  @IsEnum(ACCOUNT_TYPE)
  @IsNotEmpty()
  accountType: ACCOUNT_TYPE;

  @IsString({ each: true })
  @IsOptional()
  social?: string[];

  @IsOptional()
  address: AddressDto;
}
