import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createCompanyDto,
  editCompanyDto,
} from 'src/definitions/dtos/commons/company';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/commons/company';
import {
  badRequestException,
  isValidMongoId,
  notFoundException,
} from 'src/util';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async create() {
    // console.log("🚀 ~ CompanyService ~ create ~ createCompanyDto:", createCompanyDto)
    // const { companyName } = createCompanyDto;
    // console.log('🚀 ~ CompanyService ~ create ~ companyName:', companyName);
    // const companyExists = await this.companyModel.exists({
    //   companyName,
    // });
    // if (companyExists) {
    //   throw badRequestException('Company already exists');
    // }
    // const company = await this.companyModel.create(createCompanyDto);
    // if (!company) {
    //   throw badRequestException('Company not created');
    // }
    // console.log('i am here');
    // return company;
  }

  async edit(editCompanyDto: editCompanyDto, id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Company id is not valid');
    }

    const { companyName } = editCompanyDto;
    const companyExists = await this.companyModel.exists({
      companyName,
    });
    if (companyExists) {
      throw badRequestException('Company already exists');
    }

    const editCompany = await this.companyModel.findByIdAndUpdate(
      id,
      {
        ...editCompanyDto,
      },
      { new: true },
    );
    if (!editCompany) {
      throw notFoundException('Company not updated');
    }

    return editCompany;
  }

  async getSingle(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Company id is not valid');
    }

    const company = await this.companyModel.findById(id);
    if (!company) {
      throw notFoundException('Company not found');
    }

    return company;
  }

  async getAll() {
    const company = await this.companyModel.find();
    if (company.length === 0) {
      throw notFoundException('Company not found');
    }

    return company;
  }

  async delete(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Company id is not valid');
    }

    const company = await this.companyModel.findByIdAndDelete(id);
    if (!company) {
      throw notFoundException('Company not found');
    }

    return company;
  }
}
