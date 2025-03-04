import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Employee } from 'src/schemas/employees/employee';
import { Status } from 'src/schemas/enums/common';

export class ApproveOvertimeDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'Id is not valid' })
  approvedBy: String | Types.ObjectId | Employee;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Status)
  status: Status;
}
