import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PROJECT_MODEL, projectSchema } from 'src/schemas/project';
import { MongooseModule } from '@nestjs/mongoose';
import { TEAM_MODEL, teamSchema } from 'src/schemas/employees/team';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { AppConfigService } from 'src/config';
import { CLIENT_MODEL, clientSchema } from 'src/schemas/client';
import { EMPLOYEE_MODEL, employeeSchema } from 'src/schemas/employees/employee';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROJECT_MODEL, schema: projectSchema },
      { name: USER_MODEL, schema: userSchema },
      { name: TEAM_MODEL, schema: teamSchema },
      { name: CLIENT_MODEL, schema: clientSchema },
      { name: EMPLOYEE_MODEL, schema: employeeSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, AppConfigService],
})
export class ProjectModule {}
