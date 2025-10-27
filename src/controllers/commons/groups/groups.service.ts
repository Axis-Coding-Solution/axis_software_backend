import {
  CreateGroupDto,
  EditGroupDto,
} from '@/definitions/dtos/commons/roles-and-permissions/groups';
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

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.groupModel,
      search,
      'role',
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
    const group = await deleteHelper(id, GROUP_MODEL, this.groupModel);

    return group;
  }
}
