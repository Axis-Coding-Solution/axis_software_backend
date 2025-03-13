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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';
import { CreateProjectDto } from 'src/definitions/dtos/project/create/create-project.dto';
import { successfulResponse } from 'src/utils';
import { EditProjectDto } from 'src/definitions/dtos/project/edit/edit-project.dto';
import { AppConfigService } from 'src/config';
import { FileValidationPipe } from 'src/pipes/file';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/middlewares/guard';
import { PROJECT_MODEL } from 'src/schemas/project';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: storage,
    }),
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles(new FileValidationPipe(false)) files: Array<Express.Multer.File>,
  ) {
    if (files && files.length > 0) {
      createProjectDto.files = files.map(
        (file) => `${this.appConfigService.serverPath}/uploads/images/${file.filename}`,
      );
    }

    const employee = await this.projectService.create(createProjectDto);
    return successfulResponse(`${PROJECT_MODEL} created successfully`, employee);
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
    @UploadedFiles(new FileValidationPipe(false)) files: Array<Express.Multer.File>,
  ) {
    if (files && files.length > 0) {
      editProjectDto.files = files.map(
        (file) => `${this.appConfigService.serverPath}/uploads/images/${file.filename}`,
      );
    }

    const employee = await this.projectService.edit(editProjectDto, id);
    return successfulResponse(`${PROJECT_MODEL} edited successfully`, employee);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const project = await this.projectService.getSingle(id);
    return successfulResponse(`${PROJECT_MODEL} found successfully`, project);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const projects = await this.projectService.getAll(page, limit, search);
    return successfulResponse(`${PROJECT_MODEL} found successfully`, projects);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const project = await this.projectService.delete(id);
    return successfulResponse(`${PROJECT_MODEL} deleted successfully`, project);
  }
}
