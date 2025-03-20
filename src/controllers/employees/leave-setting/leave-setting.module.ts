import { Module } from '@nestjs/common';
import { LeaveSettingService } from './leave-setting.service';
import { LeaveSettingController } from './leave-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LEAVE_SETTING_MODEL, LeaveSettingSchema } from 'src/schemas/employees/leave-setting';

@Module({
  imports: [MongooseModule.forFeature([{ name: LEAVE_SETTING_MODEL, schema: LeaveSettingSchema }])],
  controllers: [LeaveSettingController],
  providers: [LeaveSettingService],
})
export class LeaveSettingModule {}
