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
import { COMPANY_MODEL } from 'src/schemas/commons/company';
import { InjectModel } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';
import { SERVER_PATH } from 'src/config';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  async create(
    @Body() createCompanyDto: createCompanyDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      createCompanyDto.profileImage = `${process.env.LOCAL_BACKEND_URL}/uploads/images/${profileImage.filename}`;
      // console.log('🚀 ~ CompanyController ~ file:', profileImage.filename);
    }
    const company = await this.companyService.create();
    console.log('🚀 ~ CompanyController ~ company:', company);
    return successfulResponse('Company created successfully', company);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() editCompanyDto: editCompanyDto,
  ) {
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
