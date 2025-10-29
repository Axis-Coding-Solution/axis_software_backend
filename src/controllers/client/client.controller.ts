import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard, isAdminGuard } from '@/common/guards';
import { Types } from 'mongoose';
import { successfulResponse } from 'src/utils';
import { CreateClientDto, EditClientDto } from 'src/definitions/dtos/client';
import { CLIENT_MODEL } from 'src/schemas/client';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientService.create(createClientDto);
    return successfulResponse(`${CLIENT_MODEL} created successfully`, client);
  }

  @Put(':id')
  async edit(@Param('id') id: Types.ObjectId, @Body() editClientDto: EditClientDto) {
    const editClient = await this.clientService.edit(editClientDto, id);

    return successfulResponse(`${CLIENT_MODEL} edited successfully`, editClient);
  }

  @Get(':id')
  async get(@Param('id') id: Types.ObjectId) {
    const client = await this.clientService.getSingle(id);
    return successfulResponse(`${CLIENT_MODEL} found successfully`, client);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const clients = await this.clientService.getAll(page, limit, search);
    return successfulResponse(`${CLIENT_MODEL} found successfully`, clients);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const client = await this.clientService.delete(id);
    return successfulResponse(`${CLIENT_MODEL} deleted successfully`, client);
  }
}
