import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Company {
  @Prop({ required: true })
  companyName: String;
}

export type CompanyDocument = Company & Document;
export const companySchema = SchemaFactory.createForClass(Company);
export const Company_MODEL = Company.name;
