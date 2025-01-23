import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export const conflictException = (message: string, data: any = null) => {
  return new ConflictException({
    success: false,
    message,
    data,
  });
};

export const badRequestException = (message: string, data: any = null) => {
  return new BadRequestException({
    success: false,
    message,
    data,
  });
};

export const notFoundException = (message: string, data: any = null) => {
  return new NotFoundException({
    success: false,
    message,
    data,
  });
};

export const forbiddenException = (message: string, data: any = null) => {
  return new ForbiddenException({
    success: false,
    message,
    data,
  });
};
