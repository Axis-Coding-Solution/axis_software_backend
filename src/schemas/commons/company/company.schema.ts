import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Contact } from '../../enum';

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
  website: String;

  @Prop({ required: true })
  tags: String[];

  @Prop({
    type: String,
    enum: Object.keys(Contact),
    immutable: true,
    required: true,
  })
  contact: Contact;

  @Prop({ required: true })
  aboutCompany: String;
}

export type CompanyDocument = Company & Document;
export const companySchema = SchemaFactory.createForClass(Company);
export const COMPANY_MODEL = Company.name;
