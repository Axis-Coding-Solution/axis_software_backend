import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LEAVE_MODEL, leaveSchema } from 'src/schemas/employees/leave';
import { EMPLOYEE_MODEL, employeeSchema } from 'src/schemas/employees/employee';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { LEAVE_SETTING_MODEL, LeaveSettingSchema } from 'src/schemas/employees/leave-setting';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LEAVE_MODEL, schema: leaveSchema },
      { name: EMPLOYEE_MODEL, schema: employeeSchema },
      { name: USER_MODEL, schema: userSchema },
      { name: LEAVE_SETTING_MODEL, schema: LeaveSettingSchema },
    ]),
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
