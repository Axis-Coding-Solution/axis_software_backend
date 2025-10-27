import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception.getStatus?.() ||
      exception?.response?.status ||
      exception?.response?.statusCode ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const res = exception?.response;

    if (res?.success !== undefined && res?.message !== undefined) {
      return response.status(status).json(res);
    }

    const message = res?.message || exception?.message || 'Internal server error';

    return response.status(status).json({
      success: false,
      message,
      data: null,
      status,
    });
  }
}
