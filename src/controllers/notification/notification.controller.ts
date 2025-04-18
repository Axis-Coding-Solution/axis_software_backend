import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { successfulResponse } from '@/utils';
import { Types } from 'mongoose';
import { CreateNotificationDto } from '@/definitions/dtos/notification/create-notification.dto';
import { EditNotificationDto } from '@/definitions/dtos/notification/edit-notification.dto';
import { NOTIFICATION_MODEL } from '@/schemas/notification';
import { JwtAuthGuard } from '@/middlewares/guard';

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
