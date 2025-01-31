import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EducationInformation {
  @Prop()
  institution?: string;

  @Prop()
  startDate?: string;

  @Prop()
  endDate?: Date;

  @Prop()
  degree?: string;

  @Prop()
  grade?: string;
}

export const educationInformationSchema =
  SchemaFactory.createForClass(EducationInformation);
