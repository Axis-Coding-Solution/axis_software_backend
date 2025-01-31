import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExperienceInformation {
  @Prop()
  companyName?: string;

  @Prop()
  location?: string;

  @Prop()
  designation?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;
}

export const experienceInformationSchema = SchemaFactory.createForClass(
  ExperienceInformation,
);
