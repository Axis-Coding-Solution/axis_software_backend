import { Type } from '@/schemas/enums/common/notification.enum';
import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Type, { message: 'Type is invalid' })
  @IsString()
  @IsNotEmpty()
  type: Type;

  @IsBoolean()
  @IsOptional()
  read?: boolean;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
