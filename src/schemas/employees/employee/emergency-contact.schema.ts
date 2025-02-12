import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmergencyContact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  relationship: string;

  @Prop({ required: true })
  phone1: string;

  @Prop()
  phone2?: string;
}

export const emergencyContactSchema =
  SchemaFactory.createForClass(EmergencyContact);
