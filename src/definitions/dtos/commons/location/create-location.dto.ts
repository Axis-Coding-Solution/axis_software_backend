import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString({ message: 'Location name must be a string' })
  @IsNotEmpty({ message: 'Location name is required' })
  locationName: string;

  @IsOptional()
  @IsString({ message: 'Longitude must be a string' })
  longitude?: string;

  @IsOptional()
  @IsString({ message: 'Latitude must be a string' })
  latitude?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'isActive must be a boolean value' })
  @IsOptional()
  isActive?: boolean;
}
