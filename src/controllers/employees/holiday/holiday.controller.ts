import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { JwtAuthGuard } from '@/common/guards';
import { CreateHolidayDto, EditHolidayDto } from 'src/definitions/dtos/employees/holiday';
import { successfulResponse } from 'src/utils';
import { Types } from 'mongoose';
import { HOLIDAY_MODEL } from 'src/schemas/employees/holiday';

@UseGuards(JwtAuthGuard)
@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) { }

  @Post()
  async create(@Body() createHolidayDto: CreateHolidayDto) {
    const holiday = await this.holidayService.create(createHolidayDto);
    return successfulResponse(`${HOLIDAY_MODEL} created successfully`, holiday);
  }

  @Put(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() editHolidayDto: EditHolidayDto) {
    const editHoliday = await this.holidayService.edit(editHolidayDto, id);

    return successfulResponse(`${HOLIDAY_MODEL} edited successfully`, editHoliday);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const holiday = await this.holidayService.getSingle(id);
    return successfulResponse(`${HOLIDAY_MODEL} found successfully`, holiday);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const holidays = await this.holidayService.getAll(page, limit, search);
    return successfulResponse(`${HOLIDAY_MODEL} found successfully`, holidays);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const holiday = await this.holidayService.delete(id);
    return successfulResponse(`${HOLIDAY_MODEL} deleted successfully`, holiday);
  }
}
