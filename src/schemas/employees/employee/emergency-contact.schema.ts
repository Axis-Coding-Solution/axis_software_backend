import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmergencyContact {
  @Prop()
  name: String;

  @Prop()
  relationship: String;

  @Prop()
  phone1: String;

  @Prop()
  phone2?: String;
}

export const emergencyContactSchema = SchemaFactory.createForClass(EmergencyContact);
