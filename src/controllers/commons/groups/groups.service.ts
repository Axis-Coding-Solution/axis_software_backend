import {
  CreateGroupDto,
  EditGroupDto,
} from '@/definitions/dtos/commons/roles-and-permissions/groups';
import { CustomNotFoundException } from '@/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GROUP_MODEL, GroupDocument } from 'src/schemas/roles-and-permissions';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(GROUP_MODEL)
    private readonly groupModel: Model<GroupDocument>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const { role } = createGroupDto;

    role ? await existsHelper(role, 'role', this.groupModel) : null;

    const group = await createHelper(createGroupDto, GROUP_MODEL, this.groupModel);

    return group;
  }

  async edit(editGroupDto: EditGroupDto, id: Types.ObjectId) {
    const { role } = editGroupDto;

    role ? await existsHelper(role, 'role', this.groupModel, id) : null;

    const group = await editHelper(id, editGroupDto, GROUP_MODEL, this.groupModel);

    return group;
  }

  async getSingle(id: Types.ObjectId) {
    const group = await getSingleHelper(id, GROUP_MODEL, this.groupModel);

    return group;
  }

  async getAll(search: string) {
    const filters = {};
    if (search) {
      filters['role'] = { $regex: search, $options: 'i' };
    }
    const allGroups = await this.groupModel.find(filters).exec();
    if (allGroups.length === 0) {
      throw CustomNotFoundException(`${GROUP_MODEL} not found`);
    }

    return allGroups;
  }

  async delete(id: Types.ObjectId) {
    const group = await deleteHelper(id, GROUP_MODEL, this.groupModel);

    return group;
  }
}
