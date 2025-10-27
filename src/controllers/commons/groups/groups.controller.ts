import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { successfulResponse } from 'src/utils';
import { GROUP_MODEL } from 'src/schemas/roles-and-permissions';
import { Types } from 'mongoose';
import {
  CreateGroupDto,
  EditGroupDto,
} from '@/definitions/dtos/commons/roles-and-permissions/groups';
import { isAdminGuard, JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Roles } from '@/common/decorator';
import { Role } from '@/schemas/constants';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const createGroup = await this.groupsService.create(createGroupDto);

    return successfulResponse(`${GROUP_MODEL} created successfully`, createGroup);
  }

  @Put(':id')
  async edit(@Param('id') id: Types.ObjectId, @Body() editGroupDto: EditGroupDto) {
    const editGroup = await this.groupsService.edit(editGroupDto, id);

    return successfulResponse(`${GROUP_MODEL} edited successfully`, editGroup);
  }

  @Get(':id')
  async getSingle(@Param('id') id: Types.ObjectId) {
    const singleGroup = await this.groupsService.getSingle(id);

    return successfulResponse(`${GROUP_MODEL} found successfully`, singleGroup);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const allGroups = await this.groupsService.getAll(page, limit, search);

    return successfulResponse(`${GROUP_MODEL} found successfully`, allGroups);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const deleteGroup = await this.groupsService.delete(id);

    return successfulResponse(`${GROUP_MODEL} deleted successfully`, deleteGroup);
  }
}
