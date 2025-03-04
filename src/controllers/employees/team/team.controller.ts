import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';
import { successfulResponse } from 'src/utils';
import {
  CreateTeamDto,
  EditTeamDto,
} from 'src/definitions/dtos/employees/team';
import { Types } from 'mongoose';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    const team = await this.teamService.create(createTeamDto);
    return successfulResponse('team created successfully', team);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() editTeamDto: EditTeamDto) {
    const editTeam = await this.teamService.edit(editTeamDto, id);

    return successfulResponse('Team edited successfully', editTeam);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const team = await this.teamService.getSingle(id);
    return successfulResponse('team found successfully', team);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const teams = await this.teamService.getAll(page, limit, search);
    return successfulResponse('teams found successfully', teams);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const team = await this.teamService.delete(id);
    return successfulResponse('team deleted successfully', team);
  }
}
