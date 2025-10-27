import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { successfulResponse } from '@/utils';
import { Types } from 'mongoose';
import { NOTIFICATION_MODEL } from '@/schemas/notification';
import { CreateNotificationDto, EditNotificationDto } from '@/definitions/dtos/notification';
import { JwtAuthGuard } from '@/common/guards';

@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationService.create(createNotificationDto);
    return successfulResponse(`${NOTIFICATION_MODEL} created successfully`, notification);
  }

  @Put(':id')
  async edit(@Body() editNotificationDto: EditNotificationDto, @Param('id') id: Types.ObjectId) {
    const editNotification = await this.notificationService.edit(editNotificationDto, id);
    return successfulResponse(`${NOTIFICATION_MODEL} edited successfully`, editNotification);
  }

  @Put('read/:id')
  async readNotification(@Param('id') id: Types.ObjectId) {
    const notification = await this.notificationService.readNotification(id);
    return successfulResponse(`${NOTIFICATION_MODEL} read successfully`, notification);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const notification = await this.notificationService.getSingle(id);
    return successfulResponse(`${NOTIFICATION_MODEL} found successfully`, notification);
  }

  @Get()
  async getAll(@Query('page') page: string, @Query('limit') limit: string) {
    const notification = await this.notificationService.getAll(page, limit);
    return successfulResponse(`${NOTIFICATION_MODEL} found successfully`, notification);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const notification = await this.notificationService.delete(id);
    return successfulResponse(`${NOTIFICATION_MODEL} deleted successfully`, notification);
  }
}
