import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { successfulResponse } from 'src/utils';
import { Types } from 'mongoose';
import { PunchInDto, PunchOutDto } from 'src/definitions/dtos/employees/attendance';
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
    return successfulResponse(`${ATTENDANCE_MODEL} recorded successfully`, leave);
  }

  @Put(':id')
  async punchOut(
    @Body() punchOut: PunchOutDto,
    @User('id') currentUserId: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    const leave = await this.attendanceService.punchOut(punchOut, currentUserId, id);
    return successfulResponse(`${ATTENDANCE_MODEL} recorded successfully`, leave);
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
    @Query('date') date?: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    const leave = await this.attendanceService.getAll(page, limit, date, month, year);
    return successfulResponse(`${ATTENDANCE_MODEL} found successfully`, leave);
  }
}
