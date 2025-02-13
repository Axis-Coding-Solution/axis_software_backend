import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, USER_MODEL } from '../commons/user';
import {
  communicationChannels,
  Priority,
  ProjectStatus,
  ProjectType,
  RateType,
} from '../enums/project';
import { Team, TEAM_MODEL } from '../employees/team';
import { Currency } from '../enums/common';

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  projectName: String;

  @Prop({
    type: String,
    enum: ProjectType,
    immutable: false,
    required: true,
  })
  projectType: ProjectType;

  @Prop({ type: [Types.ObjectId], ref: USER_MODEL, required: true })
  clientId: String[] | Types.ObjectId[] | User[];

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true })
  rate: Number;

  @Prop({
    type: String,
    enum: Currency,
    immutable: false,
  })
  currency: Currency;

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

  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  projectLeader: String | Types.ObjectId | User;

  @Prop({ type: [Types.ObjectId], ref: TEAM_MODEL, required: true })
  teamId: String[] | Types.ObjectId[] | Team[];

  @Prop({ required: true })
  description: String;

  @Prop()
  files: [String];

  @Prop({
    type: String,
    enum: ProjectStatus,
    immutable: true,
  })
  projectStatus: ProjectStatus;

  @Prop()
  tags: String[];

  @Prop()
  technologyStack: String[];

  @Prop()
  repositories: String[];

  @Prop({
    type: [String],
    enum: communicationChannels,
    immutable: false,
  })
  communicationChannels: communicationChannels[];

  @Prop({ type: [Types.ObjectId], ref: USER_MODEL })
  Stakeholders: String[] | Types.ObjectId[] | User[];
}

export type ProjectDocument = Project & Document;
export const projectSchema = SchemaFactory.createForClass(Project);
export const PROJECT_MODEL = Project.name;
