import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExperienceInformation {
  @Prop()
  companyName?: String;

  @Prop()
  location?: String;

  @Prop()
  designation?: String;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;
}

export const experienceInformationSchema = SchemaFactory.createForClass(
  ExperienceInformation,
);
