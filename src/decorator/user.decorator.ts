import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayloadInterface } from 'src/interfaces/user';
/**
 * Custom decorator used to get current user from the request
 * @param {keyof UserPayloadInterface | undefined} data Role or id.If no data is passed then whole user object will be returned.
 * @param {ExecutionContext} ctx The execution context
 * @returns {String | UserPayloadInterface} User id or role or whole user object.
 */
export const User = createParamDecorator(
  (data: keyof UserPayloadInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayloadInterface;
    return data ? user[data] : user;
  },
);
