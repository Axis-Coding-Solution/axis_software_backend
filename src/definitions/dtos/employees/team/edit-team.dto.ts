import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/schemas/commons/user';
import { Department } from 'src/schemas/employees/department';

export class EditTeamDto {
  @IsString()
  @IsOptional()
  teamName?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  teamLeader?: string | Types.ObjectId | User;

  @IsString()
  @IsMongoId()
  @IsOptional()
  teamManager?: string | Types.ObjectId | User;

  @IsString({ each: true })
  @IsMongoId({ each: true })
  @IsOptional()
  teamMembers?: string[] | Types.ObjectId[] | User[];

  @IsString()
  @IsMongoId()
  @IsOptional()
  department?: string | Types.ObjectId | Department;
}
