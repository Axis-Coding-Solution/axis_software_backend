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
import { CompanyService } from './company.service';
import { createCompanyDto, editCompanyDto } from 'src/definitions/dtos/commons/company';
import { successfulResponse } from 'src/utils';
import { JwtAuthGuard } from 'src/middlewares/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/middlewares';
import { AppConfigService } from 'src/config';
import { FileValidationPipe } from 'src/pipes/file';
import { Types } from 'mongoose';
import { COMPANY_MODEL } from 'src/schemas/commons/company';
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async create(
    @Body() createCompanyDto: createCompanyDto,
    @UploadedFile(new FileValidationPipe(true, 'Profile image'))
    profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      createCompanyDto.profileImage = `${this.appConfigService.serverPath}/uploads/images/${profileImage.filename}`;
    }
    const company = await this.companyService.create(createCompanyDto);
    return successfulResponse(`${COMPANY_MODEL} created successfully`, company);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: storage,
    }),
  )
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() editCompanyDto: editCompanyDto,
    @UploadedFile(new FileValidationPipe(false)) profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      editCompanyDto.profileImage = `${this.appConfigService.serverPath}/uploads/images/${profileImage.filename}`;
    }
    const editCompany = await this.companyService.edit(editCompanyDto, id);

    return successfulResponse(`${COMPANY_MODEL} edited successfully`, editCompany);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const company = await this.companyService.getSingle(id);
    return successfulResponse(`${COMPANY_MODEL} found successfully`, company);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const designations = await this.companyService.getAll(page, limit, search);
    return successfulResponse(`${COMPANY_MODEL} found successfully`, designations);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const company = await this.companyService.delete(id);
    return successfulResponse(`${COMPANY_MODEL} deleted successfully`, company);
  }
}
