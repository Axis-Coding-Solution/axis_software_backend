import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createCompanyDto, editCompanyDto } from 'src/definitions/dtos/commons/company';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/commons/company';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { badRequestException, isValidMongoId, notFoundException } from 'src/utils';
import { getAllHelper } from 'src/utils/helper';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<CompanyDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createCompanyDto: createCompanyDto) {
    const { companyName, owner } = createCompanyDto;
    const companyExists = await this.companyModel.exists({
      companyName,
    });
    if (companyExists) {
      throw badRequestException('Company already exists');
    }

    const findOwner = await this.userModel.findById(owner);
    if (!findOwner) {
      throw badRequestException('Owner not found');
    }

    const company = await this.companyModel.create(createCompanyDto);
    if (!company) {
      throw badRequestException('Company not created');
    }

    return company;
  }

  async edit(editCompanyDto: editCompanyDto, id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Company id is not valid');
    }

    const { companyName, owner } = editCompanyDto;
    const companyExists = await this.companyModel.exists({
      companyName,
    });
    if (companyExists) {
      throw badRequestException('Company already exists');
    }

    const findOwner = await this.userModel.findById(owner);
    if (!findOwner) {
      throw badRequestException('Owner not found');
    }

    const editCompany = await this.companyModel.findByIdAndUpdate(
      id,
      {
        ...editCompanyDto,
      },
      { new: true },
    );
    if (!editCompany) {
      throw notFoundException('Company not found');
    }

    return editCompany;
  }

  async getSingle(id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Company id is not valid');
    }

    const company = await this.companyModel.findById(id);
    if (!company) {
      throw notFoundException('Company not found');
    }

    return company;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.companyModel,
      search,
      'companyName',
      [
        {
          path: 'owner',
          select: 'firstName lastName userName -_id',
        },
      ],
    );

    if (items.length === 0) {
      throw notFoundException('Departments not found');
    }

    return {
      data: items,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
      },
    };
  }

  async delete(id: Types.ObjectId) {
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
