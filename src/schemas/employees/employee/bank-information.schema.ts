import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class bankInformation {
  @Prop()
  bankName?: String;

  @Prop()
  branchName?: String;

  @Prop()
  bankAccountNumber?: String;

  @Prop()
  ifscCode?: String;

  @Prop()
  panNumber?: String;
}

export const bankInformationSchema =
  SchemaFactory.createForClass(bankInformation);
