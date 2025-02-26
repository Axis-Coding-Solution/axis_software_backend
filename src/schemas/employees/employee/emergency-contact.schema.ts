import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmergencyContact {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  relationship: String;

  @Prop({ required: true })
  phone1: String;

  @Prop()
  phone2?: String;
}

export const emergencyContactSchema =
  SchemaFactory.createForClass(EmergencyContact);
