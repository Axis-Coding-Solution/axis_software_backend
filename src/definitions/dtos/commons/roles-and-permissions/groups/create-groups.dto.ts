import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString({ message: 'Role must be a string' })
  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description?: string;
}
