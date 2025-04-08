import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GROUP_MODEL, groupSchema } from 'src/schemas/roles-and-permissions';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: GROUP_MODEL, schema: groupSchema }])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
