import { IsNotEmpty, IsString } from 'class-validator';

export class editDepartmentDto {
  @IsString()
  @IsNotEmpty()
  departmentName: string;
}
