import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HOLIDAY_MODEL, holidaySchema } from 'src/schemas/employees/holiday';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HOLIDAY_MODEL, schema: holidaySchema }]),
  ],
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class HolidayModule {}
