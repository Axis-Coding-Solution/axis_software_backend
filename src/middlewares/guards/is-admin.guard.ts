import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class isAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user?.role !== 'ADMIN') {
      throw new ForbiddenException(
        `${user?.role} is not eligible to access this resource`,
      );
    }

    return true;
  }
}
