import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Department {
  @Prop({ required: true })
  departmentName: String;
}

export type DepartmentDocument = Department & Document;
export const departmentSchema = SchemaFactory.createForClass(Department);
export const DEPARTMENT_MODEL = Department.name;
