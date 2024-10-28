import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DEPARTMENT_MODEL,
  departmentSchema,
} from 'src/schemas/department-schema';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DEPARTMENT_MODEL, schema: departmentSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
