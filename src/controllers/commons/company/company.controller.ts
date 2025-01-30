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
import { CompanyService } from './company.service';
import {
  createCompanyDto,
  editCompanyDto,
} from 'src/definitions/dtos/commons/company';
import { successfulResponse } from 'src/util';
import { JwtAuthGuard } from 'src/middlewares/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async create(
    @Body() createCompanyDto: createCompanyDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      createCompanyDto.profileImage = `${process.env.LOCAL_BACKEND_URL}/uploads/images/${profileImage.filename}`;
    }
    const company = await this.companyService.create(createCompanyDto);
    return successfulResponse('Company created successfully', company);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() editCompanyDto: editCompanyDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      editCompanyDto.profileImage = `${process.env.LOCAL_BACKEND_URL}/uploads/images/${profileImage.filename}`;
    }
    const editCompany = await this.companyService.edit(editCompanyDto, id);

    return successfulResponse('Company edited successfully', editCompany);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const company = await this.companyService.getSingle(id);
    return successfulResponse('Company found successfully', company);
  }

  @Get()
  async getAll() {
    const designations = await this.companyService.getAll();
    return successfulResponse('Company found successfully', designations);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const company = await this.companyService.delete(id);
    return successfulResponse('Company deleted successfully', company);
  }
}
