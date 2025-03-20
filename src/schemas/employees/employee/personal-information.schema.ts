import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaritalStatus } from 'src/schemas/enums/employees/employee/marital-status.enum';

@Schema()
export class PersonalInformation {
  @Prop()
  passportNo?: String;

  @Prop()
  passportExpDate?: String;

  @Prop()
  tel?: String;

  @Prop()
  nationality: String;

  @Prop()
  religion?: String;

  @Prop({
    type: String,
    enum: Object.keys(MaritalStatus),
  })
  maritalStatus: MaritalStatus;

  @Prop({ default: false })
  employmentOfSpouse?: String;

  @Prop()
  noOfChildren?: String;
}

export const personalInformationSchema = SchemaFactory.createForClass(PersonalInformation);
