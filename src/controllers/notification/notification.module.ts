import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NOTIFICATION_MODEL, notificationSchema } from '@/schemas/notification';
import { USER_MODEL, userSchema } from '@/schemas/commons/user';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NOTIFICATION_MODEL, schema: notificationSchema },
      { name: USER_MODEL, schema: userSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
