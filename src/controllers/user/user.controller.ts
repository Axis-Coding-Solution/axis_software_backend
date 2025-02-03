import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/util';
import { isAdminGuard, JwtAuthGuard } from 'src/middlewares/guard';
@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return successfulResponse('Users found successfully', users);
  }
}
