import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Group, GROUP_MODEL } from './group.schema';
import { Menu, MENU_MODEL } from './menus.schema';

@Schema({ timestamps: true })
export class GroupMenu {
  @Prop({ type: Types.ObjectId, ref: GROUP_MODEL, required: true })
  groupId: String | Types.ObjectId | Group;

  @Prop({ type: Types.ObjectId, ref: MENU_MODEL, required: true })
  menuId: String | Types.ObjectId | Menu;

  @Prop({ required: true, default: false })
  read: Boolean;

  @Prop({ required: true, default: false })
  write: Boolean;

  @Prop({ required: true, default: false })
  import: Boolean;

  @Prop({ required: true, default: false })
  export: Boolean;
}

export type GroupMenuDocument = GroupMenu & Document;
export const groupMenuSchema = SchemaFactory.createForClass(GroupMenu);
export const GROUP_MENU_MODEL = GroupMenu.name;
