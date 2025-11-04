import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtAuthGuard } from '@/common/guards';
import { CreateLocationDto, EditLocationDto } from '@/definitions/dtos/commons/location';
import { successfulResponse } from '@/utils';
import { LOCATION_MODEL } from '@/schemas/commons/location';
import { Types } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    const createLocation = await this.locationService.create(createLocationDto);

    return successfulResponse(`${LOCATION_MODEL} created successfully`, createLocation);
  }

  @Put(':id')
  async edit(@Param('id') id: Types.ObjectId, @Body() editLocationDto: EditLocationDto) {
    const editLocation = await this.locationService.edit(editLocationDto, id);

    return successfulResponse(`${LOCATION_MODEL} edited successfully`, editLocation);
  }

  @Get(':id')
  async getSingle(@Param('id') id: Types.ObjectId) {
    const singleLocation = await this.locationService.getSingle(id);

    return successfulResponse(`${LOCATION_MODEL} found successfully`, singleLocation);
  }

  @Get()
  async getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const allLocations = await this.locationService.getAll(page, limit, search);

    return successfulResponse(`${LOCATION_MODEL} found successfully`, allLocations);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    const deleteLocation = await this.locationService.delete(id);

    return successfulResponse(`${LOCATION_MODEL} deleted successfully`, deleteLocation);
  }
}
