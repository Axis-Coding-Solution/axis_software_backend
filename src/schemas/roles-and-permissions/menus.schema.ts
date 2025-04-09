import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Menu {
  @Prop({ required: true })
  name: String;

  @Prop()
  path?: String;

  @Prop({ default: false })
  subMenu?: Boolean;

  @Prop({ default: null })
  parentId?: String;

  @Prop()
  uniqueId?: String;
}

export type MenuDocument = Menu & Document;
export const menuSchema = SchemaFactory.createForClass(Menu);
export const MENU_MODEL = Menu.name;
