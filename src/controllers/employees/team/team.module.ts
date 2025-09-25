import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TEAM_MODEL, teamSchema } from 'src/schemas/employees/team';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { DEPARTMENT_MODEL, departmentSchema } from 'src/schemas/employees/department';
import { EMPLOYEE_MODEL, employeeSchema } from 'src/schemas/employees/employee';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TEAM_MODEL, schema: teamSchema },
      { name: DEPARTMENT_MODEL, schema: departmentSchema },
      { name: EMPLOYEE_MODEL, schema: employeeSchema },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
