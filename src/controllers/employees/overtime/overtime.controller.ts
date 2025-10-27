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
  Req,
  UseGuards,
} from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { CreateOvertimeDto } from 'src/definitions/dtos/employees/overtime/create-overtime.dto';
import { successfulResponse } from 'src/utils';
import { OVERTIME_MODEL } from 'src/schemas/employees/overtime';
import { Types } from 'mongoose';
import { EditOvertimeDto } from 'src/definitions/dtos/employees/overtime/edit-overtime.dto';
import { User } from '@/common/decorator';
import { ApproveOvertimeDto } from 'src/definitions/dtos/employees/overtime/approve-overtime.dto';
import { JwtAuthGuard } from '@/common/middlewares/guard';

@UseGuards(JwtAuthGuard)
@Controller('overtime')
export class OvertimeController {
  constructor(private readonly overtimeService: OvertimeService) {}

  @Post()
  async create(@Body() createOvertimeDto: CreateOvertimeDto) {
    const overtime = await this.overtimeService.create(createOvertimeDto);
    return successfulResponse(`${OVERTIME_MODEL} created successfully`, overtime);
  }

  @Put(':id')
  async edit(@Body() editOvertimeDto: EditOvertimeDto, @Param('id') id: Types.ObjectId) {
    const editOvertime = await this.overtimeService.edit(editOvertimeDto, id);
    return successfulResponse(`${OVERTIME_MODEL} edited successfully`, editOvertime);
  }

  @Get('data-fetched')
  async data(@Query('date') date: string) {
    const data = await this.overtimeService.data(date);
    return successfulResponse(`${OVERTIME_MODEL} data found successfully`, data);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const overtime = await this.overtimeService.getSingle(id);
    return successfulResponse(`${OVERTIME_MODEL} found successfully`, overtime);
  }

  @Get()
  async getAll(@Query('page') page: string, @Query('limit') limit: string) {
    const overtime = await this.overtimeService.getAll(page, limit);
    return successfulResponse(`${OVERTIME_MODEL} found successfully`, overtime);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const overtime = await this.overtimeService.delete(id);
    return successfulResponse(`${OVERTIME_MODEL} deleted successfully`, overtime);
  }

  @Patch(':id')
  async approval(
    @Body() approveOvertimeDto: ApproveOvertimeDto,
    @User('id') currentUserId: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    const overtime = await this.overtimeService.approval(approveOvertimeDto, currentUserId, id);
    return successfulResponse(`${OVERTIME_MODEL} approved successfully`, overtime);
  }
}
