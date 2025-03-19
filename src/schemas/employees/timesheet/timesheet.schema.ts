import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Project, PROJECT_MODEL } from 'src/schemas/project';
import { Employee, EMPLOYEE_MODEL } from '../employee';

@Schema({ timestamps: true })
export class Timesheet {
  @Prop({ type: [Types.ObjectId], ref: PROJECT_MODEL, required: true })
  projectId: String[] | Types.ObjectId[] | Project[];

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hours: Number;

  @Prop({ required: true })
  description: String;

  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL, required: true })
  employeeId: String | Types.ObjectId | Employee;
}
export type TimesheetDocument = Timesheet & Document;
export const timesheetSchema = SchemaFactory.createForClass(Timesheet);
export const TIMESHEET_MODEL = Timesheet.name;
