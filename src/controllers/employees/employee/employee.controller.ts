import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { JwtAuthGuard, isAdminGuard } from '@/common/middlewares/guard';
import { successfulResponse } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmployeeDto } from 'src/definitions/dtos/employees/employee/create';
import { EditEmployeeDto } from 'src/definitions/dtos/employees/employee/edit';
import { AppConfigService } from 'src/config';
import { Types } from 'mongoose';
import { EMPLOYEE_MODEL } from 'src/schemas/employees/employee';
import { storage } from '@/common/middlewares';
import { FileValidationPipe } from '@/common/pipes/file';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile(new FileValidationPipe(false, 'Profile image')) profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      createEmployeeDto.profileImage = `${this.appConfigService.serverPath}/uploads/images/${profileImage.filename}`;
    }

    const employee = await this.employeeService.create(createEmployeeDto);
    return successfulResponse(`${EMPLOYEE_MODEL} created successfully`, employee);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async edit(
    @Param('id') id: Types.ObjectId,
    @Body() editEmployeeDto: EditEmployeeDto,
    @UploadedFile(new FileValidationPipe(false)) profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      editEmployeeDto.profileImage = `${this.appConfigService.serverPath}/uploads/images/${profileImage.filename}`;
    }

    const employee = await this.employeeService.edit(editEmployeeDto, id);
    return successfulResponse(`${EMPLOYEE_MODEL} edited successfully`, employee);
  }

  @Get(':id')
  async getSingle(@Param('id') id: Types.ObjectId) {
    const employee = await this.employeeService.getSingle(id);
    return successfulResponse(`${EMPLOYEE_MODEL} found successfully`, employee);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('employeeName') employeeName: string,
    @Query('employeeId') employeeId: string,
    @Query('designationName') designationName: string,
  ) {
    const employees = await this.employeeService.getAll(
      page,
      limit,
      employeeName,
      employeeId,
      designationName,
    );
    return successfulResponse(`${EMPLOYEE_MODEL} found successfully`, employees);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const employee = await this.employeeService.delete(id);
    return successfulResponse(`${EMPLOYEE_MODEL} deleted successfully`, employee);
  }
}
