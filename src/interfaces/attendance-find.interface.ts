import { Types } from 'mongoose';

export interface FindAttendanceInterface {
  date: Date;
  requiredHours: number;
  remainingHours: number;
  employeeId: Types.ObjectId;
}
