import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Role } from 'src/schemas/constants';
import { Employee, EMPLOYEE_MODEL } from 'src/schemas/employees/employee';

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: String;

  @Prop()
  lastName: String;

  @Prop({ required: true, unique: true })
  userName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  password: String;

  @Prop()
  age?: Number;

  @Prop({
    type: String,
    enum: Object.keys(Role),
    immutable: true,
    required: true,
  })
  role?: Role;

  @Prop({
    default: false,
  })
  isEmailVerified?: Boolean;

  @Prop()
  address?: String;

  @Prop({ type: Types.ObjectId, ref: EMPLOYEE_MODEL })
  employeeId: String | Types.ObjectId | Employee;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
export const USER_MODEL = User.name;
