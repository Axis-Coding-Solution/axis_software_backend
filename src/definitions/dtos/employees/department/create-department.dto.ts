import { IsNotEmpty, IsString } from 'class-validator';

export class createDepartmentDto {
  @IsString()
  @IsNotEmpty()
  departmentName: String;
}
