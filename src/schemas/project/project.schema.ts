import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Priority, RateType } from '../enums/project';
import { Client, CLIENT_MODEL } from '../client';
import { Employee, EMPLOYEE_MODEL } from '../employees/employee';

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  projectName: String;

  @Prop({ type: Types.ObjectId, ref: CLIENT_MODEL, required: true })
  clientId: String | Types.ObjectId | Client;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ required: true })
  rate: Number;

  @Prop({
    type: String,
    enum: RateType,
    immutable: true,
    required: true,
  })
  rateType: RateType;

  @Prop({
    type: String,
    enum: Priority,
    immutable: true,
    required: true,
  })
  priority: Priority;

  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL, required: true })
  projectLeader: String | Types.ObjectId | Employee;

  @Prop({ required: true })
  description: String;

  @Prop()
  files?: [String];

  @Prop({ type: [Types.ObjectId], ref: EMPLOYEE_MODEL, required: true })
  teamMembers: String[] | Types.ObjectId[] | Employee[];
}

export type ProjectDocument = Project & Document;
export const projectSchema = SchemaFactory.createForClass(Project);
export const PROJECT_MODEL = Project.name;
