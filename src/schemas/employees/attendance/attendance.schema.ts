import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Holiday, HOLIDAY_MODEL } from '../holiday';
import { Employee, EMPLOYEE_MODEL } from '../employee';

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, required: true, ref: EMPLOYEE_MODEL })
  employeeId: String | Types.ObjectId | Employee;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, default: 0 })
  totalHours: Number;

  @Prop({ required: true, default: 1 })
  break: Number;

  @Prop({ required: true, default: 0 })
  remainingHours: Number;

  @Prop({ required: true, default: 0 })
  overtime: Number;

  @Prop({ required: true, default: 9 })
  requiredHours: Number;

  @Prop({ type: Types.ObjectId, ref: HOLIDAY_MODEL })
  holidayId: String | Types.ObjectId | Holiday;

  @Prop({ required: true, default: false })
  isPunch: Boolean;

  @Prop({ required: true, default: 0 })
  punchIn: String;

  @Prop({ required: true, default: 0 })
  punchOut: String;
}

export type AttendanceDocument = Attendance & Document;
export const attendanceSchema = SchemaFactory.createForClass(Attendance);
export const ATTENDANCE_MODEL = Attendance.name;
