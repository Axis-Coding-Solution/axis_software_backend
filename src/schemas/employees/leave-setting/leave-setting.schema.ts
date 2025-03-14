import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class LeaveSetting {
  @Prop({ required: true })
  policyName: String;

  @Prop({ required: true })
  noOfDays: Number;
}

export type LeaveSettingDocument = LeaveSetting & Document;
export const LeaveSettingSchema = SchemaFactory.createForClass(LeaveSetting);
export const LEAVE_SETTING_MODEL = LeaveSetting.name;
