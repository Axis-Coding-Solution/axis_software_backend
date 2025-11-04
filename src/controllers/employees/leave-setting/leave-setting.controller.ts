import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LeaveSettingService } from './leave-setting.service';
import { successfulResponse } from 'src/utils';
import { Types } from 'mongoose';
import {
  CreateLeaveSettingDto,
  EditLeaveSettingDto,
} from 'src/definitions/dtos/employees/leave-setting';
import { LEAVE_SETTING_MODEL } from 'src/schemas/employees/leave-setting';
import { JwtAuthGuard } from '@/common/guards';

@UseGuards(JwtAuthGuard)
@Controller('leave-setting')
export class LeaveSettingController {
  constructor(private readonly leaveSettingService: LeaveSettingService) { }

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveSettingDto) {
    const leave = await this.leaveSettingService.create(createLeaveDto);
    return successfulResponse(`${LEAVE_SETTING_MODEL} created successfully`, leave);
  }

  @Put(':id')
  async edit(@Body() editLeaveDto: EditLeaveSettingDto, @Param('id') id: Types.ObjectId) {
    const editLeave = await this.leaveSettingService.edit(editLeaveDto, id);
    return successfulResponse(`${LEAVE_SETTING_MODEL} edited successfully`, editLeave);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const leave = await this.leaveSettingService.getSingle(id);
    return successfulResponse(`${LEAVE_SETTING_MODEL} found successfully`, leave);
  }

  @Get()
  async getAll(@Query('page') page: string, @Query('limit') limit: string) {
    const leave = await this.leaveSettingService.getAll(page, limit);
    return successfulResponse(`${LEAVE_SETTING_MODEL} found successfully`, leave);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const leave = await this.leaveSettingService.delete(id);
    return successfulResponse(`${LEAVE_SETTING_MODEL} deleted successfully`, leave);
  }
}
