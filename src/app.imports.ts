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
import { AttendanceModule } from './controllers/employees/attendance/attendance.module';
import { RolesAndPermissionsModule } from './controllers/commons/roles-and-permissions/roles-and-permissions.module';
import { SeedingModule } from './seeding/module/seeding.module';
import { GroupsModule } from './controllers/commons/groups/groups.module';
import { MenusModule } from './controllers/commons/menus/menus.module';
import { NotificationModule } from './controllers/notification/notification.module';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { LocationModule } from './controllers/commons/location/location.module';
import { GuardsModule } from './common/guards/guards.module';

const GlobalImports = [
  //* env global config
  ConfigModule.forRoot({
    isGlobal: true,
  }),

  //* throttling implementation
  ThrottlerModule.forRoot([
    {
      name: 'globalThrottler',
      ttl: minutes(1),
      limit: 60,
    },
  ]),

  //* static file serving
  ServeStaticModule.forRoot({
    rootPath: `${process.cwd()}/uploads`,
    serveRoot: '/uploads',
  }),

  //* cache module
  CacheModule.register({
    isGlobal: true,
    ttl: 300000,
    max: 100,
  }),

  //* Guards module
  GuardsModule,

  //* other modules
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
  OvertimeModule,
  LeaveModule,
  ClientModule,
  LeaveSettingModule,
  AttendanceModule,
  RolesAndPermissionsModule,
  SeedingModule,
  GroupsModule,
  MenusModule,
  NotificationModule,
  LocationModule,
];

export default GlobalImports;
