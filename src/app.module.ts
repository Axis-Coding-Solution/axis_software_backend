import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infra/mongoose/database.module';
import { UserModule } from './controllers/auth/auth.module';
import { DepartmentModule } from './controllers/employees/department/department.module';
import { DesignationModule } from './controllers/employees/designation/designation.module';
import { CheckDbConnectionCommand } from './command';
import { CompanyModule } from './controllers/commons/company/company.module';
import { UploadFileInterceptor } from './middlewares';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataBaseModule,
    UserModule,
    DepartmentModule,
    DesignationModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CheckDbConnectionCommand,
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: UploadFileInterceptor,
    // },
  ],
})
export class AppModule {}
