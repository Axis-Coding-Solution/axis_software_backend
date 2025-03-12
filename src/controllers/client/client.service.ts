import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateClientDto, EditClientDto } from 'src/definitions/dtos/client';
import { CLIENT_MODEL, ClientDocument } from 'src/schemas/client';
import { badRequestException } from 'src/utils';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from 'src/config';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { InjectModel } from '@nestjs/mongoose';
import { FindClient } from 'src/interface/find-client.interface';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(CLIENT_MODEL)
    private readonly clientModel: Model<ClientDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    private readonly appConfigService: AppConfigService,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const { userName, password, confirmPassword } = createClientDto;

    if (!password || !confirmPassword) return null;

    if (password !== confirmPassword) {
      throw badRequestException('Password and confirm password does not match');
    }

    // const salt = bcrypt.genSaltSync(this.appConfigService.saltRounds);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);
    createClientDto.password = passwordHash;
    createClientDto.confirmPassword = passwordHash;

    await existsHelper(userName, 'userName', this.clientModel);

    const client = await createHelper(createClientDto, CLIENT_MODEL, this.clientModel);

    //? interacting with user model
    const makeUserOfClient = await this.userModel.create({
      userName: client.userName,
      email: client.email,
      password: passwordHash,
      role: 'client',
      clientId: client._id,
    });
    if (!makeUserOfClient) {
      throw badRequestException('User not created!');
    }

    return client;
  }

  async edit(editClientDto: EditClientDto, id: Types.ObjectId) {
    const { userName, password, confirmPassword } = editClientDto;
    if (password && confirmPassword) {
      // const salt = bcrypt.genSaltSync(this.appConfigService.saltRounds);
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hash(password, salt);
      editClientDto.password = passwordHash;
      editClientDto.confirmPassword = passwordHash;
    }

    const editClient = await editHelper<FindClient>(
      id,
      editClientDto,
      CLIENT_MODEL,
      this.clientModel,
    );

    const updateData: any = {
      userName: userName,
      email: editClientDto.email,
    };
    //? interacting with user model
    const updateUser = await this.userModel.findOneAndUpdate(
      { clientId: editClient._id },
      updateData,
      { new: true },
    );
    if (!updateUser) {
      throw badRequestException('User not updated');
    }

    return editClient;
  }

  async getSingle(id: Types.ObjectId) {
    const client = await getSingleHelper(id, CLIENT_MODEL, this.clientModel);

    return client;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.clientModel,
      search,
      'clientId',
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
    const client = await deleteHelper(id, CLIENT_MODEL, this.clientModel);

    return client;
  }
}
