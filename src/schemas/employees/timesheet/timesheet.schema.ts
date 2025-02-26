import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Project, PROJECT_MODEL } from 'src/schemas/project';

@Schema({ timestamps: true })
export class Timesheet {
  @Prop({ type: [Types.ObjectId], ref: PROJECT_MODEL, required: true })
  projectId: String[] | Types.ObjectId[] | Project[];

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hours: number;

  @Prop({ required: true })
  description: String;
}
export type TimesheetDocument = Timesheet & Document;
export const timesheetSchema = SchemaFactory.createForClass(Timesheet);
export const TIMESHEET_MODEL = Timesheet.name;
