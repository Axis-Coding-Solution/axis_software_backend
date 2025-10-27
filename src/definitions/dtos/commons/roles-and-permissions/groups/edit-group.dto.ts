import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-groups.dto';

export class EditGroupDto extends PartialType(CreateGroupDto) {}
