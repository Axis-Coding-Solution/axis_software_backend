import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department, DEPARTMENT_MODEL } from '../department/department.schema';

@Schema({ timestamps: true })
export class Designation {
  @Prop({ required: true })
  designationName: String;

  @Prop({ type: Types.ObjectId, ref: DEPARTMENT_MODEL, required: true })
  departmentId: String | Types.ObjectId | Department;
}

export type DesignationDocument = Designation & Document;
export const designationSchema = SchemaFactory.createForClass(Designation);
export const DESIGNATION_MODEL = Designation.name;
