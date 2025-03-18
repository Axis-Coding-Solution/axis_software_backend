import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department, DEPARTMENT_MODEL } from '../department';
import { User, USER_MODEL } from 'src/schemas/commons/user';
import { EMPLOYEE_MODEL } from '../employee';

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true })
  teamName: String;

  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL })
  teamLeader: String | Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL })
  teamManager: String | Types.ObjectId | User;

  @Prop({ type: [Types.ObjectId], ref: EMPLOYEE_MODEL })
  teamMembers: String[] | Types.ObjectId[] | User[];

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL })
  department: String | Types.ObjectId | Department;
}

export type TeamDocument = Team & Document;
export const teamSchema = SchemaFactory.createForClass(Team);
export const TEAM_MODEL = Team.name;
