import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TIMESHEET_MODEL, timesheetSchema } from 'src/schemas/employees/timesheet';
import { PROJECT_MODEL, projectSchema } from 'src/schemas/project';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TIMESHEET_MODEL, schema: timesheetSchema },
      { name: PROJECT_MODEL, schema: projectSchema },
    ]),
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService],
})
export class TimesheetModule {}
