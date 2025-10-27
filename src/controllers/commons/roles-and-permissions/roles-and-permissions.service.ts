import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createGroupMenuDto,
  EditGroupMenuDto,
} from 'src/definitions/dtos/commons/roles-and-permissions';
import {
  GROUP_MODEL,
  GroupDocument,
  MENU_MODEL,
  MenuDocument,
} from 'src/schemas/roles-and-permissions';
import {
  GROUP_MENU_MODEL,
  GroupMenuDocument,
} from 'src/schemas/roles-and-permissions/group-menu.schema';
import { notFoundException } from 'src/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class RolesAndPermissionsService {
  constructor(
    @InjectModel(GROUP_MENU_MODEL)
    private readonly groupMenuModel: Model<GroupMenuDocument>,

    @InjectModel(GROUP_MODEL)
    private readonly groupModel: Model<GroupDocument>,

    @InjectModel(MENU_MODEL)
    private readonly menuModel: Model<MenuDocument>,
  ) {}

  async create(createGroupMenuDto: createGroupMenuDto) {
    const { groupId, menuId } = createGroupMenuDto;

    groupId ? await getSingleHelper(groupId, GROUP_MODEL, this.groupModel) : null;
    menuId ? await getSingleHelper(menuId, MENU_MODEL, this.menuModel) : null;

    const groupMenu = await createHelper(createGroupMenuDto, GROUP_MENU_MODEL, this.groupMenuModel);

    return groupMenu;
  }

  async edit(editGroupMenuDto: EditGroupMenuDto, id: Types.ObjectId) {
    const { groupId, menuId } = editGroupMenuDto;

    groupId ? await getSingleHelper(groupId, GROUP_MODEL, this.groupModel) : null;
    menuId ? await getSingleHelper(menuId, MENU_MODEL, this.menuModel) : null;

    const groupMenu = await editHelper(id, editGroupMenuDto, GROUP_MENU_MODEL, this.groupMenuModel);

    return groupMenu;
  }

  async getSingle(id: Types.ObjectId) {
    const groupMenu = await getSingleHelper(id, GROUP_MENU_MODEL, this.groupMenuModel);

    return groupMenu;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.groupMenuModel,
      undefined,
      undefined,
      [
        {
          path: 'groupId',
        },
        {
          path: 'menuId',
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
    const groupMenu = await deleteHelper(id, GROUP_MENU_MODEL, this.groupMenuModel);

    return groupMenu;
  }

  async getGroupMenu(role: string) {
    const groupDocument = await this.groupModel.findOne({ role });
    const groupId = groupDocument._id.toString();

    const groupMenu = await this.groupMenuModel.find({ groupId }).populate('groupId menuId').exec();

    if (!groupMenu) throw notFoundException(`${GROUP_MENU_MODEL} not found`);

    return groupMenu;
  }
}
