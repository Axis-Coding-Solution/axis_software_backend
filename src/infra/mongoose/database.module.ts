import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config.service';
import {
  GROUP_MENU_MODEL,
  groupMenuSchema,
  GROUP_MODEL,
  groupSchema,
  MENU_MODEL,
  menuSchema,
} from '@/schemas/roles-and-permissions';
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      { name: GROUP_MODEL, schema: groupSchema },
      { name: MENU_MODEL, schema: menuSchema },
      { name: GROUP_MENU_MODEL, schema: groupMenuSchema },
    ]),
  ],

  exports: [MongooseModule],
})
export class DataBaseModule {}
