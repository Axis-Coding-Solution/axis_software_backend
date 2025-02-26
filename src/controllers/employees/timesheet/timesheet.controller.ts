import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { successfulResponse } from 'src/utils';
import { createTimesheetDto } from 'src/definitions/dtos/employees/timesheet/create-timesheet.dto';
import { editTimesheetDto } from 'src/definitions/dtos/employees/timesheet/edit-timesheet.dto';

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post()
  async create(@Body() createTimesheetDto: createTimesheetDto) {
    const timesheet = await this.timesheetService.create(createTimesheetDto);
    return successfulResponse('timesheet created successfully', timesheet);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() editTimesheetDto: editTimesheetDto) {
    const editTimesheet = await this.timesheetService.edit(editTimesheetDto, id);

    return successfulResponse('timesheet edited successfully', editTimesheet);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const timesheet = await this.timesheetService.getSingle(id);
    return successfulResponse('timesheet found successfully', timesheet);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const timesheet = await this.timesheetService.getAll(page, limit, search);
    return successfulResponse('Timesheet found successfully', timesheet);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const timesheet = await this.timesheetService.delete(id);
    return successfulResponse('timesheet deleted successfully', timesheet);
  }
}
