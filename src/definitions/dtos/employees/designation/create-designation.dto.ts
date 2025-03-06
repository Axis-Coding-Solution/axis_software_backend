import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Department } from 'src/schemas/employees/department';

export class createDesignationDto {
  @IsString()
  @IsNotEmpty()
  designationName: String;

  @IsNotEmpty()
  @IsMongoId({ message: 'Department id is not valid' })
  departmentId: String | Types.ObjectId | Department;
}
