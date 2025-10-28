import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { createDepartmentDto, editDepartmentDto } from 'src/definitions/dtos/employees/department';
import { successfulResponse } from 'src/utils';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Types } from 'mongoose';
import { DEPARTMENT_MODEL } from 'src/schemas/employees/department';
import { RequireMenuPermission, Roles } from '@/common/decorator';
import { PermissionType } from '@/schemas/enums/common';
import { MenuPermissionGuard } from '@/common/guards/permission.guard';
import { Role } from '@/schemas/constants';

@UseGuards(JwtAuthGuard, RolesGuard, MenuPermissionGuard)
// @Roles(Role.admin)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @RequireMenuPermission('departments', PermissionType.write)
  async create(@Body() createDepartmentDto: createDepartmentDto) {
    const department = await this.departmentService.create(createDepartmentDto);

    return successfulResponse(`${DEPARTMENT_MODEL} created successfully`, department);
  }

  @Put(':id')
  @RequireMenuPermission('departments', PermissionType.write)
  async update(@Param('id') id: Types.ObjectId, @Body() editDepartmentDto: editDepartmentDto) {
    const editDepartment = await this.departmentService.edit(editDepartmentDto, id);

    return successfulResponse(`${DEPARTMENT_MODEL} edited successfully`, editDepartment);
  }

  @Get(':id')
  @RequireMenuPermission('departments', PermissionType.read)
  async get(@Param('id') id: Types.ObjectId) {
    const department = await this.departmentService.getSingle(id);

    return successfulResponse(`${DEPARTMENT_MODEL} found successfully`, department);
  }

  @Get()
  @RequireMenuPermission('departments', PermissionType.read)
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const departments = await this.departmentService.getAll(page, limit, search);

    return successfulResponse(`${DEPARTMENT_MODEL} found successfully`, departments);
  }

  @Delete(':id')
  @RequireMenuPermission('departments', PermissionType.write)
  async delete(@Param('id') id: Types.ObjectId) {
    const department = await this.departmentService.delete(id);

    return successfulResponse(`${DEPARTMENT_MODEL} deleted successfully`, department);
  }
}
