import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  teamName: String;

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
