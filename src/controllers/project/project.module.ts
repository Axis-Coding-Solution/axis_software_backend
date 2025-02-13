import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PROJECT_MODEL, projectSchema } from 'src/schemas/project';
import { MongooseModule } from '@nestjs/mongoose';
import { TEAM_MODEL, teamSchema } from 'src/schemas/employees/team';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROJECT_MODEL, schema: projectSchema },
      { name: USER_MODEL, schema: userSchema },
      { name: TEAM_MODEL, schema: teamSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
