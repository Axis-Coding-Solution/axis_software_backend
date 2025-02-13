import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FamilyInformation {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  relationship: String;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  phone: String;
}

export const familyInformationSchema =
  SchemaFactory.createForClass(FamilyInformation);
