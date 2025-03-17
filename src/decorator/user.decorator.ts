import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * This decorator is used to get id of current user from the request
 * @returns {Types.ObjectId} current user id
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.id;
});
