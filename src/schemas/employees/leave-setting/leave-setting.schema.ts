import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EMPLOYEE_MODEL } from '../employee';
import { LeaveType } from 'src/schemas/enums/employees/leave';

@Schema({ timestamps: true })
export class LeaveSetting {
  @Prop({ required: true })
  policyName: String;

  @Prop({ required: true })
  noOfDays: Number;

  @Prop({
    type: String,
    enum: LeaveType,
  })
  type?: LeaveType;

  @Prop()
  isCustomPolicy?: Boolean;

  @Prop({ type: [Types.ObjectId], ref: EMPLOYEE_MODEL })
  employeeIds?: String[];
}

export type LeaveSettingDocument = LeaveSetting & Document;
export const LeaveSettingSchema = SchemaFactory.createForClass(LeaveSetting);
export const LEAVE_SETTING_MODEL = LeaveSetting.name;
