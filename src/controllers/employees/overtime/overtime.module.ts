import { Module } from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { OvertimeController } from './overtime.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OVERTIME_MODEL, overtimeSchema } from 'src/schemas/employees/overtime';
import { EMPLOYEE_MODEL, employeeSchema } from 'src/schemas/employees/employee';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OVERTIME_MODEL, schema: overtimeSchema },
      { name: EMPLOYEE_MODEL, schema: employeeSchema },
    ]),
  ],
  controllers: [OvertimeController],
  providers: [OvertimeService],
})
export class OvertimeModule {}
