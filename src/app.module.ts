import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infra/mongoose/database.module';
import { AuthModule } from './controllers/auth/auth.module';
import { DepartmentModule } from './controllers/employees/department/department.module';
import { DesignationModule } from './controllers/employees/designation/designation.module';
import { CheckDbConnectionCommand } from './command';
import { CompanyModule } from './controllers/commons/company/company.module';
import { UploadFileInterceptor } from './middlewares';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EmployeeModule } from './controllers/employees/employee/employee.module';
import { UserModule } from './controllers/user/user.module';
import { HolidayModule } from './controllers/employees/holiday/holiday.module';
import { TeamModule } from './controllers/employees/team/team.module';
import { ProjectModule } from './controllers/project/project.module';
import { TimesheetModule } from './controllers/employees/timesheet/timesheet.module';
import { AppConfigService } from './config';
@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CheckDbConnectionCommand,
    AppConfigService,
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: UploadFileInterceptor,
    // },
  ],
})
export class AppModule {}
