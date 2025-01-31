import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';
import {
  createEmployeeDto,
  editEmployeeDto,
} from 'src/definitions/dtos/employees/employee';
import { successfulResponse } from 'src/util';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async create(
    @Body() createEmployeeDto: createEmployeeDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      createEmployeeDto.profileImage = `${process.env.LOCAL_BACKEND_URL}/uploads/images/${profileImage.filename}`;
    }

    const employee = await this.employeeService.create(createEmployeeDto);
    return successfulResponse('Employee created successfully', employee);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async edit(
    @Param('id') id: string,
    @Body() editEmployeeDto: editEmployeeDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      editEmployeeDto.profileImage = `${process.env.LOCAL_BACKEND_URL}/uploads/images/${profileImage.filename}`;
    }

    const employee = await this.employeeService.edit(editEmployeeDto, id);
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
