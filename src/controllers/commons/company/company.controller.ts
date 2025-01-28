import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  createCompanyDto,
  editCompanyDto,
} from 'src/definitions/dtos/commons/company';
import { successfulResponse, UploadFile } from 'src/util';
import {
  Company,
  COMPANY_MODEL,
  CompanyDocument,
} from 'src/schemas/commons/company';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadFileInterceptor } from 'src/middlewares';
import { JwtAuthGuard } from 'src/middlewares/guards';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  // @UseInterceptors(
  //   createUploadFileInterceptor(
  //     this.companyModel,
  //     'single',
  //     'profileImage',
  //     'company',
  //   ),
  // )
  @UseInterceptors(UploadFile)
  async create(
    @Body() createCompanyDto: createCompanyDto,
    @UploadFile({
      model: this.companyModel,
      type: 'single',
      fieldName: 'profileImage',
      subDirectory: 'company',
    })
    file: any,
  ) {
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
