import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Department } from 'src/schemas';

export class editDesignationDto {
  @IsString()
  @IsOptional()
  designationName: string;

  @IsString({ message: 'Department id must be string' })
  @IsMongoId({ message: 'Department id is not valid' })
  @IsOptional()
  departmentId: string | Types.ObjectId | Department;
}
