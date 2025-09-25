import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../commons/user';
@Schema()
export class Client {
  @Prop({ required: true })
  firstName: String;

  @Prop()
  lastName?: String;

  @Prop({ required: true, unique: true })
  userName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  password: String;

  @Prop({ required: true })
  confirmPassword: String;

  //? this id will assign to client by admin/company
  @Prop()
  clientId?: String;

  @Prop()
  phone?: String;

  @Prop()
  companyName?: String;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: String | Types.ObjectId | User;
}

export type ClientDocument = Client & Document;
export const clientSchema = SchemaFactory.createForClass(Client);
export const CLIENT_MODEL = Client.name;
