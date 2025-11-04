import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createGroupMenuDto,
  EditGroupMenuDto,
} from 'src/definitions/dtos/commons/roles-and-permissions';
import {
  Group,
  GROUP_MODEL,
  GroupDocument,
  Menu,
  MENU_MODEL,
  MenuDocument,
} from 'src/schemas/roles-and-permissions';
import {
  GROUP_MENU_MODEL,
  GroupMenuDocument,
} from 'src/schemas/roles-and-permissions/group-menu.schema';
import { CustomNotFoundException } from 'src/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';
import { Cache } from 'cache-manager';
@Injectable()
export class RolesAndPermissionsService {
  private readonly CACHE_PREFIX = 'menu_permission:';

  constructor(
    @InjectModel(GROUP_MENU_MODEL)
    private readonly groupMenuModel: Model<GroupMenuDocument>,

    @InjectModel(GROUP_MODEL)
    private readonly groupModel: Model<GroupDocument>,

    @InjectModel(MENU_MODEL)
    private readonly menuModel: Model<MenuDocument>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(createGroupMenuDto: createGroupMenuDto) {
    const { groupId, menuId } = createGroupMenuDto;

    groupId ? await getSingleHelper(groupId, GROUP_MODEL, this.groupModel) : null;
    menuId ? await getSingleHelper(menuId, MENU_MODEL, this.menuModel) : null;

    const groupMenu = await createHelper(createGroupMenuDto, GROUP_MENU_MODEL, this.groupMenuModel);

    //* Clear cache
    await this.cacheManager.del(`${this.CACHE_PREFIX}${menuId}`);

    return groupMenu;
  }

  async edit(editGroupMenuDto: EditGroupMenuDto, id: Types.ObjectId) {
    const { groupId, menuId } = editGroupMenuDto;

    groupId ? await getSingleHelper(groupId, GROUP_MODEL, this.groupModel) : null;
    menuId ? await getSingleHelper(menuId, MENU_MODEL, this.menuModel) : null;

    const groupMenu = await editHelper(id, editGroupMenuDto, GROUP_MENU_MODEL, this.groupMenuModel);

    //* Clear cache
    await this.clearCacheForGroupMenu(id);

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

    //* Clear cache
    await this.clearCacheForGroupMenu(id);

    return groupMenu;
  }

  async getGroupMenuByLogin(role: string) {
    const groupDocument = await this.groupModel.findOne({ role });
    const groupId = groupDocument?._id;

    const groupMenu = await this.groupMenuModel.find({ groupId }).populate('groupId menuId').exec();

    if (groupMenu.length === 0) {
      throw CustomNotFoundException(`${GROUP_MENU_MODEL} not found`);
    }

    return groupMenu;
  }

  async getGroupMenuByRole(role: string, page?: string, limit?: string) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const groupDocument = await this.groupModel.findOne({ role });
    const groupId = groupDocument?._id;

    const groupMenu = await this.groupMenuModel
      .find({ groupId })
      .skip(skip)
      .limit(limitNumber)
      .populate('groupId menuId')
      .exec();

    if (groupMenu.length === 0) {
      throw CustomNotFoundException(`${GROUP_MENU_MODEL} not found`);
    }

    const totalItems = await this.groupMenuModel.countDocuments({ groupId });
    const totalPages = Math.ceil(totalItems / limitNumber);

    return {
      records: groupMenu,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        itemsPerPage: limitNumber,
        currentPage: pageNumber,
      },
    };
  }

  private async clearCacheForGroupMenu(groupMenuId: Types.ObjectId) {
    try {
      const groupMenu = await this.groupMenuModel
        .findById(groupMenuId)
        .populate('groupId')
        .populate('menuId')
        .lean();

      if (!groupMenu || !groupMenu.groupId || !groupMenu.menuId) {
        return;
      }

      const role = (groupMenu.groupId as Group).role;
      const menuTitle = (groupMenu.menuId as Menu).title;
      const normalizedTitle = menuTitle.toLowerCase().trim();

      const permissions = ['read', 'write', 'import', 'export'];

      for (const permission of permissions) {
        const cacheKey = `${this.CACHE_PREFIX}${role}:${normalizedTitle}:${permission}`;
        await this.cacheManager.del(cacheKey);
      }

      console.log(`Cache cleared for role: ${role}, menu: ${menuTitle}`);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}
