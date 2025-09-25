import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ATTENDANCE_MODEL, attendanceSchema } from 'src/schemas/employees/attendance';
import { EMPLOYEE_MODEL, employeeSchema } from 'src/schemas/employees/employee';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ATTENDANCE_MODEL, schema: attendanceSchema },
      { name: EMPLOYEE_MODEL, schema: employeeSchema },
      { name: USER_MODEL, schema: userSchema },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
