import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateHolidayDto, EditHolidayDto } from 'src/definitions/dtos/employees/holiday';
import { HOLIDAY_MODEL, HolidayDocument } from 'src/schemas/employees/holiday';
import {
  CustomBadRequestException,
  CustomConflictException,
  isValidMongoId,
  CustomNotFoundException,
} from 'src/utils';
import { deleteHelper, getAllHelper, getSingleHelper } from 'src/utils/helper';

@Injectable()
export class HolidayService {
  constructor(
    @InjectModel(HOLIDAY_MODEL)
    private readonly holidayModel: Model<HolidayDocument>,
  ) {}

  async create(createHolidayDto: CreateHolidayDto) {
    if (createHolidayDto.constructor === Object && Object.keys(createHolidayDto).length === 0) {
      throw CustomBadRequestException('body is empty');
    }

    const { holidayName, holidayDate } = createHolidayDto;

    const holidayExists = await this.holidayModel.exists({
      holidayName,
    });
    if (holidayExists) {
      throw CustomConflictException('Holiday already exists');
    }

    const dayName = (date: Date, locale: string) => {
      return date.toLocaleDateString(locale, { weekday: 'long' });
    };

    createHolidayDto.day = dayName(holidayDate, 'en-US');

    const holiday = await this.holidayModel.create(createHolidayDto);
    if (!holiday) {
      throw CustomBadRequestException('Holiday not created');
    }

    return holiday;
  }

  async edit(editHolidayDto: EditHolidayDto, id: Types.ObjectId) {
    if (!isValidMongoId(id)) {
      throw CustomBadRequestException('Holiday id is not valid');
    }

    const { holidayName, holidayDate } = editHolidayDto;

    if (holidayDate) {
      const dayName = (date: Date, locale: string) => {
        return date.toLocaleDateString(locale, { weekday: 'long' });
      };
      editHolidayDto.day = dayName(holidayDate, 'en-US');
    }

    const holidayExists = await this.holidayModel.exists({
      holidayName,
      _id: { $ne: id },
    });
    if (holidayExists) {
      throw CustomConflictException('Holiday already exists');
    }

    const editHoliday = await this.holidayModel.findByIdAndUpdate(
      id,
      {
        ...editHolidayDto,
      },
      { new: true },
    );
    if (!editHoliday) {
      throw CustomNotFoundException('Holiday not found');
    }

    return editHoliday;
  }

  async getSingle(id: Types.ObjectId) {
    const holiday = await getSingleHelper(id, HOLIDAY_MODEL, this.holidayModel);

    return holiday;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.holidayModel,
      search,
      'holidayName',
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
    const holiday = await deleteHelper(id, HOLIDAY_MODEL, this.holidayModel);

    return holiday;
  }
}
