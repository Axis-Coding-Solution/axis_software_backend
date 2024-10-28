import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department, DEPARTMENT_MODEL } from './department-schema';

@Schema()
export class Designation {
  @Prop({ required: true })
  designationName: String;

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL, required: true })
  departmentId: string | Types.ObjectId | Department;
}

export type DesignationDocument = Designation & Document;
export const designationSchema = SchemaFactory.createForClass(Designation);
export const DESIGNATION_MODEL = Designation.name;
