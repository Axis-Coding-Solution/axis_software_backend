import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Holiday {
  @Prop({ required: true })
  holidayName: string;

  @Prop({ required: true })
  holidayDate: Date;
}

export type HolidayDocument = Holiday & Document;
export const holidaySchema = SchemaFactory.createForClass(Holiday);
export const HOLIDAY_MODEL = Holiday.name;
