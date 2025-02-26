import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';
import {
  CreateHolidayDto,
  EditHolidayDto,
} from 'src/definitions/dtos/employees/holiday';
import { successfulResponse } from 'src/utils';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Post()
  async create(@Body() createHolidayDto: CreateHolidayDto) {
    const holiday = await this.holidayService.create(createHolidayDto);
    return successfulResponse('Holiday created successfully', holiday);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() editHolidayDto: EditHolidayDto,
  ) {
    const editHoliday = await this.holidayService.edit(editHolidayDto, id);

    return successfulResponse('Holiday edited successfully', editHoliday);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const holiday = await this.holidayService.getSingle(id);
    return successfulResponse('Holiday found successfully', holiday);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const holidays = await this.holidayService.getAll(page, limit, search);
    return successfulResponse('Holidays found successfully', holidays);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const holiday = await this.holidayService.delete(id);
    return successfulResponse('Holiday deleted successfully', holiday);
  }
}
