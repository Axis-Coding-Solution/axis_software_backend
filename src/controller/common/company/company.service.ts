import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createCompanyDto,
  editCompanyDto,
} from 'src/defination/dtos/common/company';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/employees';
import {
  badRequestException,
  isValidMongoId,
  notFoundException,
} from 'src/utils';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  // async create(createCompanyDto: createCompanyDto) {
  //   const { companyName } = createCompanyDto;
  //   if (!companyName) {
  //     throw badRequestException('Company name is required');
  //   }

  //   const companyExists = await this.companyModel.exists({
  //     companyName,
  //   });
  //   if (companyExists) {
  //     throw badRequestException('Company already exists');
  //   }

  //   const company = await this.companyModel.create({ companyName });
  //   if (!company) {
  //     throw badRequestException('Company not created');
  //   }

  //   return company;
  // }

  // async edit(editCompanyDto: editCompanyDto, id: string) {
  //   if (!isValidMongoId(id)) {
  //     throw badRequestException('Company id is not valid');
  //   }

  //   const { companyName } = editCompanyDto;
  //   if (!companyName) {
  //     throw badRequestException('Company name is required');
  //   }

  //   const editCompany = await this.companyModel.findByIdAndUpdate(
  //     id,
  //     {
  //       companyName,
  //     },
  //     { new: true },
  //   );
  //   if (!editCompany) {
  //     throw notFoundException('Company not updated');
  //   }

  //   return editCompany;
  // }

  // async getSingle(id: string) {
  //   if (!isValidMongoId(id)) {
  //     throw badRequestException('Company id is not valid');
  //   }

  //   const company = await this.companyModel.findById(id);
  //   if (!company) {
  //     throw notFoundException('Company not found');
  //   }

  //   return company;
  // }

  // async getAll() {
  //   const company = await this.companyModel.find();
  //   if (company.length === 0) {
  //     throw notFoundException('Company not found');
  //   }

  //   return company;
  // }

  // async delete(id: string) {
  //   if (!isValidMongoId(id)) {
  //     throw badRequestException('Company id is not valid');
  //   }

  //   const company = await this.companyModel.findByIdAndDelete(id);
  //   if (!company) {
  //     throw notFoundException('Company not found');
  //   }

  //   return company;
  // }
}
