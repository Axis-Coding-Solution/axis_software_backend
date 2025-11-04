import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '@/common/guards';
import { successfulResponse } from 'src/utils';
import { CreateTeamDto, EditTeamDto } from 'src/definitions/dtos/employees/team';
import { Types } from 'mongoose';
import { TEAM_MODEL } from 'src/schemas/employees/team';

@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto) {
    const team = await this.teamService.create(createTeamDto);
    return successfulResponse(`${TEAM_MODEL} created successfully`, team);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() editTeamDto: EditTeamDto) {
    const editTeam = await this.teamService.edit(editTeamDto, id);

    return successfulResponse(`${TEAM_MODEL} edited successfully`, editTeam);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const team = await this.teamService.getSingle(id);
    return successfulResponse(`${TEAM_MODEL} found successfully`, team);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const teams = await this.teamService.getAll(page, limit, search);
    return successfulResponse(`${TEAM_MODEL} found successfully`, teams);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const team = await this.teamService.delete(id);
    return successfulResponse(`${TEAM_MODEL} deleted successfully`, team);
  }
}
