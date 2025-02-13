import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';
import { CreateProjectDto } from 'src/definitions/dtos/project/create/create-project.dto';
import { successfulResponse } from 'src/util';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
      storage: storage,
    }),
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files) {
      createProjectDto.files = `${process.env.LOCAL_BACKEND_URL}/uploads/images/${files[0].filename}`;
    }

    const employee = await this.projectService.create(createProjectDto);
    return successfulResponse('Employee created successfully', employee);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const team = await this.projectService.getSingle(id);
    return successfulResponse('team found successfully', team);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const teams = await this.projectService.getAll(page, limit, search);
    return successfulResponse('teams found successfully', teams);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const team = await this.projectService.delete(id);
    return successfulResponse('team deleted successfully', team);
  }
}
