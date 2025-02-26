// upload-file.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileInterceptor } from 'src/middlewares';

export function UploadFile(fieldName: string, subDirectory: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName),
      // new UploadFileInterceptor(undefined, 'single', fieldName, subDirectory),
    ),
  );
}
