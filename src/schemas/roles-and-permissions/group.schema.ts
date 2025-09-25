import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  role: String;

  @Prop()
  description?: String;
}

export type GroupDocument = Group & Document;
export const groupSchema = SchemaFactory.createForClass(Group);
export const GROUP_MODEL = Group.name;
