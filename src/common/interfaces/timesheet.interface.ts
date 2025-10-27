import { Types } from 'mongoose';
export interface FindTimesheetInterface {
  hours: number;
  projectId: Types.ObjectId;
}
