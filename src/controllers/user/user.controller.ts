import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { successfulResponse } from 'src/utils';
import { JwtAuthGuard, isAdminGuard } from '@/common/guards';
import { USER_MODEL } from 'src/schemas/commons/user';
import { CacheInterceptor } from '@nestjs/cache-manager';
@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    const users = await this.userService.getAll();
    return successfulResponse(`${USER_MODEL} found successfully`, users);
  }
}
