import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export type ClientDocument = Client & Document;
export const clientSchema = SchemaFactory.createForClass(Client);
export const CLIENT_MODEL = Client.name;
