import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * @param message send to client
 * @param data default will be null
 */
export const conflictException = (message: string, data: any = null) => {
  return new ConflictException({
    success: false,
    message,
    data,
  });
};

/**
 * @param message send to client
 * @param data default will be null
 */
export const badRequestException = (message: string, data: any = null) => {
  return new BadRequestException({
    success: false,
    message,
    data,
  });
};

/**
 * @param message send to client
 * @param data default will be null
 */
export const notFoundException = (message: string, data: any = null) => {
  return new NotFoundException({
    success: false,
    message,
    data,
  });
};

/**
 * @param message send to client
 * @param data default will be null
 */
export const forbiddenException = (message: string, data: any = null) => {
  return new ForbiddenException({
    success: false,
    message,
    data,
  });
};

/**
 * @param message send to client
 * @param data default will be null
 */
export const unauthorizedException = (message: string, data: any = null) => {
  return new UnauthorizedException({
    success: false,
    message,
    data,
  });
};
