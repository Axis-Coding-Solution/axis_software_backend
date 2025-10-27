import {
  CreateNotificationDto,
  EditNotificationDto,
  SendNotificationDto,
} from '@/definitions/dtos/notification';
import { NotificationInterface } from '@/common/interfaces';
import { USER_MODEL, UserDocument } from '@/schemas/commons/user';
import { NOTIFICATION_MODEL, NotificationDocument } from '@/schemas/notification';
import { CustomBadRequestException, CustomConflictException } from '@/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  getAllHelper,
  getSingleHelper,
} from '@/utils/helper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NOTIFICATION_MODEL)
    private readonly notificationModel: Model<NotificationDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    private notificationGateway: NotificationGateway,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, title, description, type, path } = createNotificationDto;
    await getSingleHelper(userId, USER_MODEL, this.userModel);

    const notification = await createHelper(
      createNotificationDto,
      NOTIFICATION_MODEL,
      this.notificationModel,
    );

    //* emit real time notification
    const socketNotification = this.notificationGateway.notifyUser(userId, {
      _id: notification._id,
      title,
      description,
      type,
      path,
      read: notification?.read,
      createdAt: notification?.createdAt,
    } as SendNotificationDto);

    console.log('fffffffffffffffffffff', socketNotification);
    return notification;
  }

  async edit(editNotificationDto: EditNotificationDto, id: Types.ObjectId) {
    const { userId } = editNotificationDto;
    userId ? await getSingleHelper(userId, USER_MODEL, this.userModel) : null;

    const editNotification = await editHelper(
      id,
      editNotificationDto,
      NOTIFICATION_MODEL,
      this.notificationModel,
    );

    return editNotification;
  }

  async getSingle(id: Types.ObjectId) {
    const notification = await getSingleHelper(
      id,
      NOTIFICATION_MODEL,
      this.notificationModel,
      'userId',
      'firstName lastName userName',
    );

    return notification;
  }

  async getAll(page: string, limit: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.notificationModel,
      null,
      null,
      [
        {
          path: 'userId',
          select: 'firstName lastName userName',
        },
      ],
    );

    return {
      data: items,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
      },
    };
  }

  async delete(id: Types.ObjectId) {
    const notification = await deleteHelper(id, NOTIFICATION_MODEL, this.notificationModel);

    return notification;
  }

  async readNotification(id: Types.ObjectId) {
    const notification = await getSingleHelper<NotificationInterface>(
      id,
      NOTIFICATION_MODEL,
      this.notificationModel,
    );
    if (notification.read) throw CustomConflictException('Notification already read');

    const updatedNotification = await this.notificationModel.findOneAndUpdate(
      { _id: id },
      { $set: { read: true } },
      { new: true },
    );
    if (!updatedNotification) throw CustomBadRequestException('Notification not found');

    return updatedNotification;
  }
}
