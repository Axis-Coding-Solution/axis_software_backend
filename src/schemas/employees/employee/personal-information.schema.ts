import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaritalStatus } from 'src/schemas/enums/employee';

@Schema()
export class PersonalInformation {
  @Prop()
  passportNo?: string;

  @Prop()
  passportExpDate?: string;

  @Prop()
  tel?: string;

  @Prop({ required: true })
  nationality: string;

  @Prop()
  religion?: string;

  @Prop({
    type: String,
    enum: Object.keys(MaritalStatus),
    immutable: true,
    required: true,
  })
  maritalStatus: MaritalStatus;

  @Prop({ default: false })
  employmentOfSpouse?: string;

  @Prop()
  noOfChildren?: string;
}

export const personalInformationSchema =
  SchemaFactory.createForClass(PersonalInformation);
