import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Status } from 'src/schemas/enums/common';
import { LeaveType } from 'src/schemas/enums/employees/leave/leave.enum';
import { Employee, EMPLOYEE_MODEL } from '../employee';

@Schema({ timestamps: true })
export class Leave {
  @Prop({
    type: String,
    enum: Object.keys(LeaveType),
    required: true,
  })
  leaveType: LeaveType;

  @Prop({ required: true })
  from: Date;

  @Prop({ required: true })
  to: Date;

  @Prop({ required: true })
  noOfDays: Number;

  @Prop({ required: true })
  reason: String;

  @Prop({
    type: String,
    enum: Object.keys(Status),
    default: Status.pending,
  })
  status: Status;

  //user who will approving leave
  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL, default: null })
  approvedBy: String | Types.ObjectId | Employee;

  //user who is requesting overtime
  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL, required: true })
  employeeId: String | Types.ObjectId | Employee;
}

export type LeaveDocument = Leave & Document;
export const leaveSchema = SchemaFactory.createForClass(Leave);
export const LEAVE_MODEL = Leave.name;
