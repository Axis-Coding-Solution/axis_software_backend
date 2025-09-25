import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Department } from 'src/schemas/employees/department';

export class editDesignationDto {
  @IsString()
  @IsOptional()
  designationName: String;

  @IsString({ message: 'Department id must be string' })
  @IsMongoId({ message: 'Department id is not valid' })
  @IsOptional()
  departmentId: String | Types.ObjectId | Department;
}
