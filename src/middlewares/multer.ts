import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';

@Injectable()
export class UploadFileInterceptor implements NestInterceptor {
  constructor(
    private readonly model: Model<any>,
    private readonly type: string,
    private readonly name: string,
    private readonly subDirectory: string,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    try {
      const { id } = req.user;
      console.log('cccccccccccccc', this.model);

      const user = await this.model.findById(id);
      if (!user || !user.username) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const authenticUsername = user.username.replace(/[^a-zA-Z0-9]/g, '');
      const targetDirectory = path.join(
        process.cwd(),
        'uploads',
        'images',
        authenticUsername,
        this.subDirectory,
      );

      if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory, { recursive: true });
      }

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, targetDirectory);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const trimmedFileName = file.originalname
            .trim()
            .replace(/[^\w\s.-]/gi, '');
          const originalFileName = trimmedFileName.replace(/\s+/g, '-');
          cb(null, uniqueSuffix + '-' + originalFileName);
        },
      });

      const upload = multer({ storage });

      await new Promise<void>((resolve, reject) => {
        upload[this.type](this.name)(req, res, (err: any) => {
          if (err) {
            reject(
              new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR),
            );
          } else {
            resolve();
          }
        });
      });

      return next.handle();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
