import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TEAM_MODEL, teamSchema } from 'src/schemas/employees/team';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import {
  DEPARTMENT_MODEL,
  departmentSchema,
} from 'src/schemas/employees/department';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TEAM_MODEL, schema: teamSchema },
      { name: USER_MODEL, schema: userSchema },
      { name: DEPARTMENT_MODEL, schema: departmentSchema },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
