import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class editTimesheetDto {
  @IsNotEmpty({ message: 'Project id is required' })
  @IsString()
  @IsMongoId({ message: 'Project id is not valid' })
  @IsOptional()
  projectId?: String;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  date?: String;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  hours?: String;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: String;
}
