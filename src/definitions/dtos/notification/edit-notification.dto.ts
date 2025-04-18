import { Type } from '@/schemas/enums/common/notification.enum';
import { IsBoolean, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class EditNotificationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Type, { message: 'Type is invalid' })
  @IsString()
  @IsOptional()
  type?: Type;

  @IsBoolean()
  @IsOptional()
  read?: boolean;

  @IsString()
  @IsOptional()
  path?: string;

  @IsMongoId()
  @IsOptional()
  userId?: Types.ObjectId;
}
