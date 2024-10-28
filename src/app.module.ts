import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infra/mongoose/database.module';
import { CheckDbConnectionCommand } from './commands/check-db-connection.command';
import { UserModule } from './controller/auth/auth.module';
import { DepartmentModule } from './controller/department-module/department.module';
import { DesignationModule } from './controller/designation-module/designation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataBaseModule,
    UserModule,
    DepartmentModule,
    DesignationModule,
  ],
  controllers: [AppController],
  providers: [AppService, CheckDbConnectionCommand],
})
export class AppModule {}
