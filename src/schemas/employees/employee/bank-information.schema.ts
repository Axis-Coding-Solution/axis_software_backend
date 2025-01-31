import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class bankInformation {
  @Prop()
  bankName?: string;

  @Prop()
  branchName?: string;

  @Prop()
  bankAccountNumber?: string;

  @Prop()
  ifscCode?: string;

  @Prop()
  panNumber?: string;
}

export const bankInformationSchema =
  SchemaFactory.createForClass(bankInformation);
