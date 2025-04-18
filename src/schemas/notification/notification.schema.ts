import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, USER_MODEL } from '../commons/user';
import { Type } from '../enums/common/notification.enum';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  title: String;

  @Prop({ required: true })
  description: String;

  @Prop({ type: String, enum: Type, required: true })
  type: Type;

  @Prop({ default: false })
  read: Boolean;

  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  userId: Types.ObjectId | User;
}

export type NotificationDocument = Notification & Document;
export const notificationSchema = SchemaFactory.createForClass(Notification);
export const NOTIFICATION_MODEL = Notification.name;
