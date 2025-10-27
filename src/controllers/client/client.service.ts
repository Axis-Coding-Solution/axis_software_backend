import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateClientDto, EditClientDto } from 'src/definitions/dtos/client';
import { CLIENT_MODEL, ClientDocument } from 'src/schemas/client';
import { CustomBadRequestException } from 'src/utils';
import * as bcrypt from 'bcrypt';
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
import { FindClientInterface } from '@/common/interfaces/user';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(CLIENT_MODEL)
    private readonly clientModel: Model<ClientDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const { userName, password, confirmPassword } = createClientDto;

    if (!password || !confirmPassword) return null;

    if (password !== confirmPassword) {
      throw CustomBadRequestException('Password and confirm password does not match');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);
    createClientDto.password = passwordHash;
    createClientDto.confirmPassword = passwordHash;

    await existsHelper(userName, 'userName', this.clientModel);

    const client = await createHelper(createClientDto, CLIENT_MODEL, this.clientModel);

    //? interacting with user model
    const updateData: object = {
      userName: client.userName,
      email: client.email,
      password: passwordHash,
      role: 'client',
      clientId: client._id,
    };

    const user = await createHelper(updateData, USER_MODEL, this.userModel);
    const updatedClient = await editHelper(
      client._id,
      { userId: user._id },
      CLIENT_MODEL,
      this.clientModel,
    );

    return updatedClient;
  }

  async edit(editClientDto: EditClientDto, id: Types.ObjectId) {
    const { userName } = editClientDto;

    const editClient = await editHelper<FindClientInterface>(
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
      throw CustomBadRequestException('User not updated');
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
    //? delete user associated to client
    await deleteHelper(client?.userId, USER_MODEL, this.userModel);

    return client;
  }
}
