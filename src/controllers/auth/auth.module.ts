import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: userSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [MongooseModule, JwtModule],
})
export class AuthModule {}
