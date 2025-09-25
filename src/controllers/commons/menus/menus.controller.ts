import { Controller, Get, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { successfulResponse } from 'src/utils';
import { MENU_MODEL } from 'src/schemas/roles-and-permissions';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const groups = await this.menusService.getAll(page, limit, search);
    return successfulResponse(`${MENU_MODEL} found successfully`, groups);
  }
}
