import { IsNotEmpty, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class editCompanyDto {
  //* basic info
  profileImage?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  companyName?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber1?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber2?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fax?: String;

  @IsString()
  @IsOptional()
  website?: String;

  @IsNotEmpty()
  @IsMongoId({ message: 'Owner id is not valid' })
  @IsOptional()
  owner?: Types.ObjectId;

  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  tags?: String[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  deals?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  industry?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contact?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  currency?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  language?: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  aboutCompany?: String;

  //* address
  @IsString()
  @IsOptional()
  primaryAddress?: String;

  @IsString()
  @IsOptional()
  secondaryAddress?: String;

  @IsString()
  @IsOptional()
  city?: String;

  @IsString()
  @IsOptional()
  state?: String;

  @IsString()
  @IsOptional()
  country?: String;

  @IsString()
  @IsOptional()
  zipCode?: String;

  //* social profile
  @IsString()
  @IsOptional()
  facebook?: String;

  @IsString()
  @IsOptional()
  instagram?: String;

  @IsString()
  @IsOptional()
  linkedin?: String;

  @IsString()
  @IsOptional()
  twitter?: String;

  @IsString()
  @IsOptional()
  youtube?: String;
}
