import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/schemas/commons/user';
import { Department } from 'src/schemas/employees/department';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  teamName: String;

  @IsString()
  @IsMongoId()
  @IsOptional()
  teamLeader?: String | Types.ObjectId | User;

  @IsString()
  @IsMongoId()
  @IsOptional()
  teamManager?: String | Types.ObjectId | User;

  @IsString({ each: true })
  @IsMongoId({ each: true })
  @IsOptional()
  teamMembers?: String[] | Types.ObjectId[] | User[];

  @IsString()
  @IsMongoId()
  @IsOptional()
  department?: String | Types.ObjectId | Department;
}
