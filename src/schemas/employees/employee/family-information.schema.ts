import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FamilyInformation {
  @Prop()
  name: String;

  @Prop()
  relationship: String;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  phone: String;
}

export const familyInformationSchema = SchemaFactory.createForClass(FamilyInformation);
