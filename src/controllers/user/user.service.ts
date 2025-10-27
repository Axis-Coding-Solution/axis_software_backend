import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { CustomNotFoundException } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async getAll() {
    const users = await this.userModel.find();
    if (users.length === 0) {
      throw CustomNotFoundException('Users not found');
    }

    return users;
  }
}
