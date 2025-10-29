import { CreateLocationDto, EditLocationDto } from '@/definitions/dtos/commons/location';
import { LOCATION_MODEL, LocationDocument } from '@/schemas/commons/location';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(LOCATION_MODEL)
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { locationName } = createLocationDto;

    locationName ? await existsHelper(locationName, 'locationName', this.locationModel) : null;

    const location = await createHelper(createLocationDto, LOCATION_MODEL, this.locationModel);

    return location;
  }

  async edit(editLocationDto: EditLocationDto, id: Types.ObjectId) {
    const { locationName } = editLocationDto;

    locationName ? await existsHelper(locationName, 'locationName', this.locationModel, id) : null;

    const location = await editHelper(id, editLocationDto, LOCATION_MODEL, this.locationModel);

    return location;
  }

  async getSingle(id: Types.ObjectId) {
    const location = await getSingleHelper(id, LOCATION_MODEL, this.locationModel);

    return location;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.locationModel,
      search,
      'locationName',
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
    const location = await deleteHelper(id, LOCATION_MODEL, this.locationModel);

    return location;
  }
}
