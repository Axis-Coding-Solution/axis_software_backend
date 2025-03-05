import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/schemas/enums/common';

export class ApproveLeaveDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Status, { message: 'Status is invalid' })
  status: Status;
}
