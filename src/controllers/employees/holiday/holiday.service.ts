import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateHolidayDto,
  EditHolidayDto,
} from 'src/definitions/dtos/employees/holiday';
import { HOLIDAY_MODEL, HolidayDocument } from 'src/schemas/employees/holiday';
import {
  badRequestException,
  conflictException,
  isValidMongoId,
  notFoundException,
} from 'src/utils';
import { getPagination } from 'src/utils/helper';

@Injectable()
export class HolidayService {
  constructor(
    @InjectModel(HOLIDAY_MODEL)
    private readonly holidayModel: Model<HolidayDocument>,
  ) {}

  async create(createHolidayDto: CreateHolidayDto) {
    if (
      createHolidayDto.constructor === Object &&
      Object.keys(createHolidayDto).length === 0
    ) {
      throw badRequestException('body is empty');
    }

    const { holidayName } = createHolidayDto;

    const holidayExists = await this.holidayModel.exists({
      holidayName,
    });
    if (holidayExists) {
      throw conflictException('Holiday already exists');
    }

    const holiday = await this.holidayModel.create(createHolidayDto);
    if (!holiday) {
      throw badRequestException('Holiday not created');
    }

    return holiday;
  }

  async edit(editHolidayDto: EditHolidayDto, id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Holiday id is not valid');
    }

    if (
      editHolidayDto.constructor === Object &&
      Object.keys(editHolidayDto).length === 0
    ) {
      throw badRequestException('body is empty');
    }

    const { holidayName, holidayDate } = editHolidayDto;

    const holidayExists = await this.holidayModel.exists({
      holidayName,
    });
    if (holidayExists) {
      throw conflictException('Holiday already exists');
    }
    const editHoliday = await this.holidayModel.findByIdAndUpdate(
      id,
      {
        ...editHolidayDto,
      },
      { new: true },
    );
    if (!editHoliday) {
      throw notFoundException('Holiday not found');
    }

    return editHoliday;
  }

  async getSingle(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Holiday id is not valid');
    }

    const holiday = await this.holidayModel.findById(id);
    if (!holiday) {
      throw notFoundException('Holiday not found');
    }

    return holiday;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } =
      await getPagination(
        page,
        limit,
        this.holidayModel,
        search,
        'holidayName',
      );

    if (items.length === 0) {
      throw notFoundException('Holidays not found');
    }

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

  async delete(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('Holiday id is not valid');
    }

    const holiday = await this.holidayModel.findByIdAndDelete(id);
    if (!holiday) {
      throw notFoundException('Holiday not found');
    }

    return holiday;
  }
}
