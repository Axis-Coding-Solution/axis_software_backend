import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';
import {
  createEmployeeDto,
  EditEmployeeDto,
} from 'src/definitions/dtos/employees/employee';
import { successfulResponse } from 'src/util';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: createEmployeeDto) {
    const employee = await this.employeeService.create(createEmployeeDto);
    return successfulResponse('Employee created successfully', employee);
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() EditEmployeeDto: EditEmployeeDto,
  ) {
    const employee = await this.employeeService.edit(EditEmployeeDto, id);
    return successfulResponse('Employee edited successfully', employee);
  }

  @Get(':id')
  async getSingle(@Param('id') id: string) {
    const employee = await this.employeeService.getSingle(id);
    return successfulResponse('Employee found successfully', employee);
  }

  @Get()
  async getAll() {
    const employees = await this.employeeService.getAll();
    return successfulResponse('Employees found successfully', employees);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const employee = await this.employeeService.delete(id);
    return successfulResponse('Employee deleted successfully', employee);
  }
}
