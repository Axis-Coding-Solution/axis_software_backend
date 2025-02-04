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
import { DesignationService } from './designation.service';
import { successfulResponse } from 'src/util';
import {
  createDesignationDto,
  editDesignationDto,
} from 'src/definitions/dtos/employees/designation';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Post()
  async create(@Body() createDesignationDto: createDesignationDto) {
    const designation =
      await this.designationService.create(createDesignationDto);
    return successfulResponse('Designation created successfully', designation);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() editDesignationDto: editDesignationDto,
  ) {
    const editDesignation = await this.designationService.edit(
      editDesignationDto,
      id,
    );

    return successfulResponse(
      'Designation edited successfully',
      editDesignation,
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const designation = await this.designationService.getSingle(id);
    return successfulResponse('Designation found successfully', designation);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const designations = await this.designationService.getAll(
      page,
      limit,
      search,
    );
    return successfulResponse('Designations found successfully', designations);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const designation = await this.designationService.delete(id);
    return successfulResponse('Designation deleted successfully', designation);
  }
}
