import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EducationInformation {
  @Prop()
  institution?: String;

  @Prop()
  startDate?: String;

  @Prop()
  endDate?: Date;

  @Prop()
  degree?: String;

  @Prop()
  grade?: String;
}

export const educationInformationSchema =
  SchemaFactory.createForClass(EducationInformation);
