import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Employee, EMPLOYEE_MODEL } from '../employee';
import { Types } from 'mongoose';
import { Status } from 'src/schemas/enums/common';

@Schema({ timestamps: true })
export class Overtime {
  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL, required: true })
  employeeId: String | Types.ObjectId | Employee;

  @Prop({ required: true })
  overtimeDate: Date;

  @Prop({ required: true })
  overtimeHours: Number;

  @Prop({ required: true })
  description: String;

  @Prop({
    type: String,
    enum: Object.keys(Status),
    immutable: true,
    default: Status.pending,
  })
  status: Status;

  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL })
  approvedBy: String | Types.ObjectId | Employee;
}

export type OvertimeDocument = Overtime & Document;
export const overtimeSchema = SchemaFactory.createForClass(Overtime);
export const OVERTIME_MODEL = Overtime.name;
