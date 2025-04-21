import { Type } from '@/schemas/enums/common/notification.enum';
import { Types } from 'mongoose';

export class SendNotificationDto {
  _id: Types.ObjectId;
  title: string;
  description: string;
  type: Type;
  path: string;
  read: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
}
