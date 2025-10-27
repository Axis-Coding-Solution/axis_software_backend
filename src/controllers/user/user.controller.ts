import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/utils';
import { JwtAuthGuard, isAdminGuard } from '@/common/middlewares/guard';
import { USER_MODEL } from 'src/schemas/commons/user';
@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return successfulResponse(`${USER_MODEL} found successfully`, users);
  }
}
