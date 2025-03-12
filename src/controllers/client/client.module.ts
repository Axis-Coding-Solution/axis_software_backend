import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENT_MODEL, clientSchema } from 'src/schemas/client';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { AppConfigService } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CLIENT_MODEL, schema: clientSchema },
      { name: USER_MODEL, schema: userSchema },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService, AppConfigService],
})
export class ClientModule {}
