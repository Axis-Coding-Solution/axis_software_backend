import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true })
  departmentName: String;
}

export type DepartmentDocument = Department & Document;
export const departmentSchema = SchemaFactory.createForClass(Department);
export const DEPARTMENT_MODEL = Department.name;
