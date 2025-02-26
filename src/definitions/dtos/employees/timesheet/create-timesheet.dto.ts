import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class createTimesheetDto {
  @IsMongoId({ message: 'Project id is not valid' })
  @IsNotEmpty({ message: 'Project id is required' })
  @IsString()
  projectId: String;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: String;

  @IsNotEmpty()
  @IsString()
  hours: String;

  @IsNotEmpty()
  @IsString()
  description: String;
}
