import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { unauthorizedException } from 'src/utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add any custom logic here if needed
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw unauthorizedException('Invalid token');
    }
    return user;
  }
}
