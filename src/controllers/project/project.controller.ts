import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';
import { CreateProjectDto } from 'src/definitions/dtos/project/create/create-project.dto';
import { successfulResponse } from 'src/utils';
import { EditProjectDto } from 'src/definitions/dtos/project/edit/edit-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: storage,
    }),
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files && files.length > 0) {
      createProjectDto.files = files.map(
        (file) =>
          `${process.env.LOCAL_BACKEND_URL}/uploads/images/${file.filename}`,
      );
    }

    const employee = await this.projectService.create(createProjectDto);
    return successfulResponse('Project created successfully', employee);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: storage,
    }),
  )
  async edit(
    @Param('id') id: string,
    @Body() editProjectDto: EditProjectDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files && files.length > 0) {
      editProjectDto.files = files.map(
        (file) =>
          `${process.env.LOCAL_BACKEND_URL}/uploads/images/${file.filename}`,
      );
    }

    const employee = await this.projectService.edit(editProjectDto, id);
    return successfulResponse('Project edited successfully', employee);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const project = await this.projectService.getSingle(id);
    return successfulResponse('project found successfully', project);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const projects = await this.projectService.getAll(page, limit, search);
    return successfulResponse('projects found successfully', projects);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const project = await this.projectService.delete(id);
    return successfulResponse('project deleted successfully', project);
  }
}
