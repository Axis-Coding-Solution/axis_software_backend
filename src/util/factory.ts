import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UploadFileInterceptor } from 'src/middlewares';

export const UploadFile = createParamDecorator(
  (
    data: { model: any; type: string; fieldName: string; subDirectory: string },
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const interceptor = new UploadFileInterceptor(
      data.model,
      data.type,
      data.fieldName,
      data.subDirectory,
    );
    return interceptor.intercept(ctx, null);
  },
);
