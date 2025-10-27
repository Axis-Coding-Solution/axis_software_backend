import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { successfulResponse } from 'src/utils';
import { Types } from 'mongoose';
import { PunchInDto, PunchOutDto } from 'src/definitions/dtos/employees/attendance';
import { User } from '@/common/decorator';
import { ATTENDANCE_MODEL } from 'src/schemas/employees/attendance';
import { JwtAuthGuard, isAdminGuard } from '@/common/middlewares/guard';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async punchIn(@Body() punchInDto: PunchInDto, @User('id') currentUserId: Types.ObjectId) {
    const attendance = await this.attendanceService.punchIn(punchInDto, currentUserId);
    return successfulResponse(`${ATTENDANCE_MODEL} recorded successfully`, attendance);
  }

  @Put(':id')
  async punchOut(
    @Body() punchOut: PunchOutDto,
    @User('id') currentUserId: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    const attendance = await this.attendanceService.punchOut(punchOut, currentUserId, id);
    return successfulResponse(`${ATTENDANCE_MODEL} recorded successfully`, attendance);
  }

  @Get('statistics')
  async statistics(@User('id') currentUserId: Types.ObjectId) {
    const statistics = await this.attendanceService.statistics(currentUserId);
    return successfulResponse(`${ATTENDANCE_MODEL} statistics found successfully`, statistics);
  }

  @UseGuards(isAdminGuard)
  @Get('admin')
  async adminAttendance() {
    const attendance = await this.attendanceService.adminAttendance();
    return successfulResponse(`${ATTENDANCE_MODEL} found successfully`, attendance);
  }

  @UseGuards(isAdminGuard)
  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const attendance = await this.attendanceService.getSingle(id);
    return successfulResponse(`${ATTENDANCE_MODEL} found successfully`, attendance);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('date') date?: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    const attendance = await this.attendanceService.getAll(page, limit, date, month, year);
    return successfulResponse(`${ATTENDANCE_MODEL} found successfully`, attendance);
  }
}
