import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department, DEPARTMENT_MODEL } from '../department';
import { User, USER_MODEL } from 'src/schemas/commons/user';

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true })
  teamName: string;

  @Prop({ type: Types.ObjectId, ref: USER_MODEL })
  teamLeader: string | Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: USER_MODEL })
  teamManager: string | Types.ObjectId | User;

  @Prop({ type: [Types.ObjectId], ref: USER_MODEL })
  teamMembers: string[] | Types.ObjectId[] | User[];

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL })
  department: string | Types.ObjectId | Department;
}

export type TeamDocument = Team & Document;
export const teamSchema = SchemaFactory.createForClass(Team);
export const TEAM_MODEL = Team.name;
