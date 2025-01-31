import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, USER_MODEL } from '../user';
import { Types } from 'mongoose';
import { Contact } from 'src/schemas/enums/common';

@Schema()
export class Company {
  @Prop({ required: true })
  profileImage: String;

  @Prop({ required: true })
  companyName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  phoneNumber1: String;

  @Prop({ required: true })
  phoneNumber2: String;

  @Prop({ required: true })
  fax: String;

  @Prop()
  website?: String;

  // @Prop()
  // reviews: String;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  owner: string | Types.ObjectId | User;

  @Prop({ required: true })
  tags: String[];

  @Prop({ required: true })
  deals: String;

  @Prop({ required: true })
  industry: String;

  // @Prop({ required: true })
  // source: String;

  @Prop({
    type: String,
    enum: Object.keys(Contact),
    immutable: true,
    required: true,
  })
  contact: Contact;

  @Prop({ required: true })
  currency: String;

  @Prop({ required: true })
  language: String;

  @Prop({ required: true })
  aboutCompany: String;
}

export type CompanyDocument = Company & Document;
export const companySchema = SchemaFactory.createForClass(Company);
export const COMPANY_MODEL = Company.name;
