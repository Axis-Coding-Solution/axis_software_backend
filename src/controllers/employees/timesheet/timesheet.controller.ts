import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { successfulResponse } from 'src/utils';
import { createTimesheetDto } from 'src/definitions/dtos/employees/timesheet/create-timesheet.dto';
import { editTimesheetDto } from 'src/definitions/dtos/employees/timesheet/edit-timesheet.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/common/guards';
import { TIMESHEET_MODEL } from 'src/schemas/employees/timesheet';
import { User } from '@/common/decorator';

@UseGuards(JwtAuthGuard)
@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post()
  async create(
    @Body() createTimesheetDto: createTimesheetDto,
    @User('id') currentUserId: Types.ObjectId,
  ) {
    const timesheet = await this.timesheetService.create(createTimesheetDto, currentUserId);
    return successfulResponse(`${TIMESHEET_MODEL} created successfully`, timesheet);
  }

  @Put(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() editTimesheetDto: editTimesheetDto) {
    const editTimesheet = await this.timesheetService.edit(editTimesheetDto, id);

    return successfulResponse(`${TIMESHEET_MODEL} edited successfully`, editTimesheet);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const timesheet = await this.timesheetService.getSingle(id);
    return successfulResponse(`${TIMESHEET_MODEL} found successfully`, timesheet);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const timesheet = await this.timesheetService.getAll(page, limit, search);
    return successfulResponse(`${TIMESHEET_MODEL} found successfully`, timesheet);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const timesheet = await this.timesheetService.delete(id);
    return successfulResponse(`${TIMESHEET_MODEL} deleted successfully`, timesheet);
  }
}
