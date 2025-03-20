import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from 'src/middlewares/guard';
import { CreateLeaveDto } from 'src/definitions/dtos/employees/leave/create-leave.dto';
import { successfulResponse } from 'src/utils';
import { LEAVE_MODEL } from 'src/schemas/employees/leave';
import { EditLeaveDto } from 'src/definitions/dtos/employees/leave/edit-leave.dto';
import { Types } from 'mongoose';
import { ApproveLeaveDto } from 'src/definitions/dtos/employees/leave/approve-leave.dto';
import { User } from 'src/decorator';

@UseGuards(JwtAuthGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto, @User('id') currentUserId: Types.ObjectId) {
    const leave = await this.leaveService.create(createLeaveDto, currentUserId);
    return successfulResponse(`${LEAVE_MODEL} created successfully`, leave);
  }

  @Put(':id')
  async edit(@Body() editLeaveDto: EditLeaveDto, @Param('id') id: Types.ObjectId) {
    const editLeave = await this.leaveService.edit(editLeaveDto, id);
    return successfulResponse(`${LEAVE_MODEL} edited successfully`, editLeave);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const leave = await this.leaveService.getSingle(id);
    return successfulResponse(`${LEAVE_MODEL} found successfully`, leave);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('employee') employee: string,
    @Query('leaveType') leaveType: string,
    @Query('status') status: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const leave = await this.leaveService.getAll(
      page,
      limit,
      employee,
      leaveType,
      status,
      from,
      to,
    );
    return successfulResponse(`${LEAVE_MODEL} found successfully`, leave);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const leave = await this.leaveService.delete(id);
    return successfulResponse(`${LEAVE_MODEL} deleted successfully`, leave);
  }

  @Patch(':id')
  async approval(
    @Body() approveLeaveDto: ApproveLeaveDto,
    @User('id') currentUserId: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    const leave = await this.leaveService.approval(approveLeaveDto, currentUserId, id);
    return successfulResponse(`${LEAVE_MODEL} approved successfully`, leave);
  }
}
