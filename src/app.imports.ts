import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infra/mongoose/database.module';
import { AuthModule } from './controllers/auth/auth.module';
import { DepartmentModule } from './controllers/employees/department/department.module';
import { DesignationModule } from './controllers/employees/designation/designation.module';
import { CompanyModule } from './controllers/commons/company/company.module';
import { EmployeeModule } from './controllers/employees/employee/employee.module';
import { UserModule } from './controllers/user/user.module';
import { HolidayModule } from './controllers/employees/holiday/holiday.module';
import { TeamModule } from './controllers/employees/team/team.module';
import { ProjectModule } from './controllers/project/project.module';
import { TimesheetModule } from './controllers/employees/timesheet/timesheet.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OvertimeModule } from './controllers/employees/overtime/overtime.module';
import { LeaveModule } from './controllers/employees/leave/leave.module';
import { ClientModule } from './controllers/client/client.module';
import { LeaveSettingModule } from './controllers/employees/leave-setting/leave-setting.module';

const GlobalImports = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  DataBaseModule,
  AuthModule,
  DepartmentModule,
  DesignationModule,
  CompanyModule,
  EmployeeModule,
  UserModule,
  HolidayModule,
  TeamModule,
  ProjectModule,
  TimesheetModule,
  ServeStaticModule.forRoot({
    rootPath: `${process.cwd()}/uploads`,
    serveRoot: '/uploads',
  }),
  OvertimeModule,
  LeaveModule,
  ClientModule,
  LeaveSettingModule,
];

export default GlobalImports;
