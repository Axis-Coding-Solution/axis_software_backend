import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  createCompanyDto,
  editCompanyDto,
} from 'src/definitions/dtos/commons/company';
import { successfulResponse } from 'src/util';
import { UploadFileMiddleware } from 'src/middlewares';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/commons/company';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('company')
export class CompanyController {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyService: CompanyService,
    private readonly companyModel: Model<CompanyDocument>,
    private readonly UploadFileMiddleware: UploadFileMiddleware,
  ) {}

  @Post()
  // @UseInterceptors(
  //   UploadFileMiddleware(
  //     this.companyModel,
  //     'single',
  //     'profileImage',
  //     'company',
  //   ),
  // )
  async create(@Body() createCompanyDto: createCompanyDto) {
    const company = await this.companyService.create(createCompanyDto);
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
