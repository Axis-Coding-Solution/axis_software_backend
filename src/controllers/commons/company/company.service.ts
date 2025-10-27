import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createCompanyDto, editCompanyDto } from 'src/definitions/dtos/commons/company';
import { CLIENT_MODEL, ClientDocument } from 'src/schemas/client';
import { COMPANY_MODEL, CompanyDocument } from 'src/schemas/commons/company';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { CustomBadRequestException, isValidMongoId, CustomNotFoundException } from 'src/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(COMPANY_MODEL)
    private readonly companyModel: Model<CompanyDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(CLIENT_MODEL)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(createCompanyDto: createCompanyDto) {
    const { companyName, owner } = createCompanyDto;

    const [, , company] = await Promise.all([
      await existsHelper(companyName, 'companyName', this.companyModel),
      await getSingleHelper(owner, 'Owner', this.clientModel),

      await createHelper(createCompanyDto, COMPANY_MODEL, this.companyModel),
    ]);

    return company;
  }

  async edit(editCompanyDto: editCompanyDto, id: Types.ObjectId) {
    const { companyName, owner } = editCompanyDto;

    await Promise.all([
      companyName ? await existsHelper(companyName, 'companyName', this.companyModel, id) : null,
      owner ? await getSingleHelper(owner, 'Owner', this.clientModel) : null,
    ]);

    const editCompany = await editHelper(id, editCompanyDto, COMPANY_MODEL, this.companyModel);

    return editCompany;
  }

  async getSingle(id: Types.ObjectId) {
    const company = await getSingleHelper(id, COMPANY_MODEL, this.companyModel);

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
    const company = await deleteHelper(id, COMPANY_MODEL, this.companyModel);

    return company;
  }
}
