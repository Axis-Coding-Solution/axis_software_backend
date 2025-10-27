import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * This is wrapper on Nest Js Exception but with custom response.
 * @param {String} message Message send to client.
 * @param {Object} data Default data will be null.
 */
export const CustomConflictException = (message: string, data: any = null) => {
  return new ConflictException({
    success: false,
    message,
    data,
  });
};

/**
 * This is wrapper on Nest Js Exception but with custom response.
 * @param {String} message Message send to client.
 * @param {Object} data Default data will be null.
 */
export const CustomBadRequestException = (message: string, data: any = null) => {
  return new BadRequestException({
    success: false,
    message,
    data,
  });
};

/**
 * This is wrapper on Nest Js Exception but with custom response.
 * @param {String} message Message send to client.
 * @param {Object} data Default data will be null.
 */
export const CustomNotFoundException = (message: string, data: any = null) => {
  return new NotFoundException({
    success: false,
    message,
    data,
  });
};

/**
 * This is wrapper on Nest Js Exception but with custom response.
 * @param {String} message Message send to client.
 * @param {Object} data Default data will be null.
 */
export const CustomForbiddenException = (message: string, data: any = null) => {
  return new ForbiddenException({
    success: false,
    message,
    data,
  });
};

/**
 * This is wrapper on Nest Js Exception but with custom response.
 * @param {String} message Message send to client.
 * @param {Object} data Default data will be null.
 */
export const CustomUnauthorizedException = (message: string, data: any = null) => {
  return new UnauthorizedException({
    success: false,
    message,
    data,
  });
};
