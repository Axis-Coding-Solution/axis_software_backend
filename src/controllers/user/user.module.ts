import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: userSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
