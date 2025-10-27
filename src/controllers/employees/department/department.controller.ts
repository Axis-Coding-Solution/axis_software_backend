import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { createDepartmentDto, editDepartmentDto } from 'src/definitions/dtos/employees/department';
import { successfulResponse } from 'src/utils';
import { JwtAuthGuard, isAdminGuard } from '@/common/guards';
import { Types } from 'mongoose';
import { DEPARTMENT_MODEL } from 'src/schemas/employees/department';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: createDepartmentDto) {
    const department = await this.departmentService.create(createDepartmentDto);
    return successfulResponse(`${DEPARTMENT_MODEL} created successfully`, department);
  }

  @Put(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() editDepartmentDto: editDepartmentDto) {
    const editDepartment = await this.departmentService.edit(editDepartmentDto, id);
    return successfulResponse(`${DEPARTMENT_MODEL}t edited successfully`, editDepartment);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const department = await this.departmentService.getSingle(id);
    return successfulResponse(`${DEPARTMENT_MODEL}nt found successfully`, department);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const departments = await this.departmentService.getAll(page, limit, search);
    return successfulResponse(`${DEPARTMENT_MODEL}ts found successfully`, departments);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const department = await this.departmentService.delete(id);
    return successfulResponse(`${DEPARTMENT_MODEL} deleted successfully`, department);
  }
}
