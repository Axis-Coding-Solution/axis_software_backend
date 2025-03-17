import { IsBoolean, IsNotEmpty } from 'class-validator';

export class PunchOutDto {
  @IsBoolean()
  @IsNotEmpty()
  isPunch: Boolean;
}
