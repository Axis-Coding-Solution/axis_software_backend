import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LEAVE_MODEL, leaveSchema } from 'src/schemas/employees/leave';

@Module({
  imports: [MongooseModule.forFeature([{ name: LEAVE_MODEL, schema: leaveSchema }])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
