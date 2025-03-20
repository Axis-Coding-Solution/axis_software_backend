import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Department } from 'src/schemas/employees/department';

export class EditTeamDto {
  @IsString()
  @IsOptional()
  teamName?: String;

  @IsString()
  @IsMongoId()
  @IsOptional()
  teamLeader?: Types.ObjectId;

  @IsString()
  @IsMongoId()
  @IsOptional()
  teamManager?: Types.ObjectId;

  @IsString({ each: true })
  @IsMongoId({ each: true })
  @IsOptional()
  teamMembers?: Types.ObjectId[];

  @IsString()
  @IsMongoId()
  @IsOptional()
  department?: Types.ObjectId;
}
