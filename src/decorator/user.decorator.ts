import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/interface';
/**
 * This decorator is used to get current user from the request
 * @param {String} data Role or id.If no data is passed then whole user object will be returned
 * @returns {String | UserPayload} User id or role or whole user object
 */
export const User = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;
    return data ? user[data] : user;
  },
);
