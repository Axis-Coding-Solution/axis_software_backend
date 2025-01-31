import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FamilyInformation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  relationship: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  phone: string;
}

export const familyInformationSchema =
  SchemaFactory.createForClass(FamilyInformation);
