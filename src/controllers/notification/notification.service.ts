import { CreateNotificationDto } from '@/definitions/dtos/notification/create-notification.dto';
import { EditNotificationDto } from '@/definitions/dtos/notification/edit-notification.dto';
import { USER_MODEL, UserDocument } from '@/schemas/commons/user';
import { NOTIFICATION_MODEL, NotificationDocument } from '@/schemas/notification';
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

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NOTIFICATION_MODEL)
    private readonly notificationModel: Model<NotificationDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId } = createNotificationDto;
    await getSingleHelper(userId, USER_MODEL, this.userModel);

    const notification = await createHelper(
      createNotificationDto,
      NOTIFICATION_MODEL,
      this.notificationModel,
    );

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
}
