import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/defination/dtos/user/register-user.dto';
import { LoginUserDto } from 'src/defination/dtos/user/login.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
