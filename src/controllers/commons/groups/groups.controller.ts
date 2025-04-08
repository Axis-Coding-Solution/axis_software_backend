import { Controller, Get, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { successfulResponse } from 'src/utils';
import { GROUP_MODEL } from 'src/schemas/roles-and-permissions';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const groups = await this.groupsService.getAll(page, limit, search);
    return successfulResponse(`${GROUP_MODEL} found successfully`, groups);
  }
}
