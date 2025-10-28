import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class createGroupMenuDto {
  @IsMongoId()
  @IsNotEmpty()
  groupId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  menuId: Types.ObjectId;

  @IsBoolean()
  @IsNotEmpty()
  read: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  write: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  import: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  export: Boolean;
}
