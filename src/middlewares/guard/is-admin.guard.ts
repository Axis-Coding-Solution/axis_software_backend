import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { forbiddenException } from 'src/util';

@Injectable()
export class isAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user?.role !== 'admin') {
      throw forbiddenException(
        `${user?.role} is not eligible to access this resource`,
      );
    }

    return true;
  }
}
