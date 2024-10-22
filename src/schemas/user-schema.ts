import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_TYPE } from 'src/constants/accountConstants';

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: String;

  @Prop()
  lastName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  password: string;

  @Prop()
  age?: Number;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_TYPE),
    immutable: true,
    required: true,
  })
  accountType?: ACCOUNT_TYPE;

  @Prop({
    default: false,
  })
  isEmailVerified?: Boolean;

  @Prop()
  address?: String;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
export const USER_MODEL = User.name;
