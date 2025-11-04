import { IsNotEmpty, IsString } from 'class-validator';

export class groupMenuByRoleDto {
  @IsString({ message: 'Role must be a string' })
  @IsNotEmpty({ message: 'Role is required' })
  role: string;
}
