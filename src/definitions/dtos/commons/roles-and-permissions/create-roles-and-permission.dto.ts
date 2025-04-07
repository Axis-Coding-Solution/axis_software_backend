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
  edit: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  delete: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  import: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  export: Boolean;
}
