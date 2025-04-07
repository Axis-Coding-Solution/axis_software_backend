import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Menu {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  path: String;

  @Prop({ required: true })
  subMenu: String[];
}

export type MenuDocument = Menu & Document;
export const menuSChema = SchemaFactory.createForClass(Menu);
export const MENU_MODEL = Menu.name;
