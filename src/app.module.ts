import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infra/mongoose/database.module';
import { CheckDbConnectionCommand } from './commands/check-db-connection.command';
import { UserModule } from './controller/userModule/user.module';
import { DepartmentModule } from './controller/departmentModule/department.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataBaseModule,
    UserModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, CheckDbConnectionCommand],
})
export class AppModule {}
