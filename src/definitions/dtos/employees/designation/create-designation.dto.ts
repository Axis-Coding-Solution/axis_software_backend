import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Department } from 'src/schemas/employees/department';

export class createDesignationDto {
  @IsString()
  @IsNotEmpty()
  designationName: string;

  @IsNotEmpty()
  @IsMongoId({ message: 'Department id is not valid' })
  departmentId: string | Types.ObjectId | Department;
}
