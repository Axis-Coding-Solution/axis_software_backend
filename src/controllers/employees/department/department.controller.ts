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
import { DepartmentService } from './department.service';
import {
  createDepartmentDto,
  editDepartmentDto,
} from 'src/definitions/dtos/employees/department';
import { successfulResponse } from 'src/utils';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: createDepartmentDto) {
    const department = await this.departmentService.create(createDepartmentDto);
    return successfulResponse('Department created successfully', department);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() editDepartmentDto: editDepartmentDto,
  ) {
    const editDepartment = await this.departmentService.edit(
      editDepartmentDto,
      id,
    );

    return successfulResponse('Department edited successfully', editDepartment);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const department = await this.departmentService.getSingle(id);
    return successfulResponse('Department found successfully', department);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const departments = await this.departmentService.getAll(
      page,
      limit,
      search,
    );
    return successfulResponse('Departments found successfully', departments);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const department = await this.departmentService.delete(id);
    return successfulResponse('Department deleted successfully', department);
  }
}
