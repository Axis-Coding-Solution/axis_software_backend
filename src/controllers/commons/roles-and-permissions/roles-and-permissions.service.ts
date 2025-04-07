import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createGroupMenuDto } from 'src/definitions/dtos/commons/roles-and-permissions';
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
import { createHelper, editHelper, getSingleHelper } from 'src/utils/helper';

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

  async createGroupMenus(createGroupMenuDto: createGroupMenuDto) {
    const { groupId, menuId } = createGroupMenuDto;

    groupId ? getSingleHelper(groupId, GROUP_MODEL, this.groupModel) : null;
    menuId ? getSingleHelper(menuId, MENU_MODEL, this.menuModel) : null;

    const groupMenu = await createHelper(createGroupMenuDto, GROUP_MENU_MODEL, this.groupMenuModel);
    return groupMenu;
  }

  async editGroupMenus(createGroupMenuDto: createGroupMenuDto, id: Types.ObjectId) {
    const { groupId, menuId } = createGroupMenuDto;

    groupId ? getSingleHelper(groupId, GROUP_MODEL, this.groupModel) : null;
    menuId ? getSingleHelper(menuId, MENU_MODEL, this.menuModel) : null;

    const groupMenu = await editHelper(
      id,
      createGroupMenuDto,
      GROUP_MENU_MODEL,
      this.groupMenuModel,
    );
    return groupMenu;
  }
}
