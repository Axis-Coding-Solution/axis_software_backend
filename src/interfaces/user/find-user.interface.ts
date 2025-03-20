import { Types } from 'mongoose';

export interface FindUserInterface {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  employeeId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
