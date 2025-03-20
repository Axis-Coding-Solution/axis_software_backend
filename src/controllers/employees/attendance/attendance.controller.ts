import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { successfulResponse } from 'src/utils';
import { Types } from 'mongoose';
import { PunchInDto } from 'src/definitions/dtos/employees/attendance';
import { User } from 'src/decorator';
import { ATTENDANCE_MODEL } from 'src/schemas/employees/attendance';
import { JwtAuthGuard } from 'src/middlewares/guard';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async punchIn(@Body() punchInDto: PunchInDto, @User('id') currentUserId: Types.ObjectId) {
    const leave = await this.attendanceService.punchIn(punchInDto, currentUserId);
    return successfulResponse(`${ATTENDANCE_MODEL} created successfully`, leave);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const leave = await this.attendanceService.getSingle(id);
    return successfulResponse(`${ATTENDANCE_MODEL} found successfully`, leave);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const leave = await this.attendanceService.getAll(page, limit, from, to);
    return successfulResponse(`${ATTENDANCE_MODEL} found successfully`, leave);
  }
}
