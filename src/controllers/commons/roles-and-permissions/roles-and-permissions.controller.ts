import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RolesAndPermissionsService } from './roles-and-permissions.service';
import { GROUP_MENU_MODEL } from 'src/schemas/roles-and-permissions';
import { successfulResponse } from 'src/utils';
import { Types } from 'mongoose';
import {
  createGroupMenuDto,
  EditGroupMenuDto,
} from 'src/definitions/dtos/commons/roles-and-permissions';
import { User } from '@/common/decorator';
import { isAdminGuard, JwtAuthGuard } from '@/common/guards';
import { MenuPermissionGuard } from '@/common/guards/permission.guard';

@UseGuards(JwtAuthGuard)
@Controller('roles-and-permissions')
export class RolesAndPermissionsController {
  constructor(private readonly rolesAndPermissionsService: RolesAndPermissionsService) {}

  @Post()
  async create(@Body() createGroupMenuDto: createGroupMenuDto) {
    const rolesAndPermission = await this.rolesAndPermissionsService.create(createGroupMenuDto);
    return successfulResponse(`${GROUP_MENU_MODEL} created successfully`, rolesAndPermission);
  }

  @Put(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() editGroupMenuDto: EditGroupMenuDto) {
    const editRolesAndPermission = await this.rolesAndPermissionsService.edit(editGroupMenuDto, id);
    return successfulResponse(`${GROUP_MENU_MODEL} edited successfully`, editRolesAndPermission);
  }

  @Get('group-menu')
  async getGroupMenu(@User('role') role: string) {
    const groupMenu = await this.rolesAndPermissionsService.getGroupMenu(role);
    return successfulResponse(`${GROUP_MENU_MODEL} found successfully`, groupMenu);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const rolesAndPermission = await this.rolesAndPermissionsService.getSingle(id);
    return successfulResponse(`${GROUP_MENU_MODEL} found successfully`, rolesAndPermission);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const rolesAndPermissions = await this.rolesAndPermissionsService.getAll(page, limit, search);
    return successfulResponse(`${GROUP_MENU_MODEL} found successfully`, rolesAndPermissions);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const rolesAndPermission = await this.rolesAndPermissionsService.delete(id);
    return successfulResponse(`${GROUP_MENU_MODEL} deleted successfully`, rolesAndPermission);
  }
}
