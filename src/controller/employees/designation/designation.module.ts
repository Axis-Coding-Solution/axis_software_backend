import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import {
  DEPARTMENT_MODEL,
  departmentSchema,
  DESIGNATION_MODEL,
  designationSchema,
} from 'src/schemas/employees';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DESIGNATION_MODEL, schema: designationSchema },
      { name: DEPARTMENT_MODEL, schema: departmentSchema },
    ]),
  ],
  controllers: [DesignationController],
  providers: [DesignationService],
})
export class DesignationModule {}
