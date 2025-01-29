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
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';

type UploadType = 'single' | 'array' | 'fields';

interface UploadField {
  name: string;
  maxCount?: number;
}

@Injectable()
export class UploadFileInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private type: UploadType,
    private name: string | UploadField[],
    private subDirectory: string,
    private maxCount?: number,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    console.log('🚀 ~ UploadFileInterceptor ~ USER_MODEL:', this.userModel);

    try {
      const { id } = req.user;
      console.log('🚀 ~ UploadFileInterceptor ~ id:', id);
      const user = await this.userModel.findOne({ _id: id });

      if (!user || !user.userName) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const authenticUsername = user.userName.replace(/[^a-zA-Z0-9]/g, '');
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
        switch (this.type) {
          case 'single':
            upload.single(this.name as string)(req, res, (err: any) => {
              err
                ? reject(
                    new HttpException(
                      err.message,
                      HttpStatus.INTERNAL_SERVER_ERROR,
                    ),
                  )
                : resolve();
            });
            break;

          case 'array':
            upload.array(this.name as string, this.maxCount || 10)(
              req,
              res,
              (err: any) => {
                err
                  ? reject(
                      new HttpException(
                        err.message,
                        HttpStatus.INTERNAL_SERVER_ERROR,
                      ),
                    )
                  : resolve();
              },
            );
            break;

          case 'fields':
            upload.fields(this.name as UploadField[])(req, res, (err: any) => {
              err
                ? reject(
                    new HttpException(
                      err.message,
                      HttpStatus.INTERNAL_SERVER_ERROR,
                    ),
                  )
                : resolve();
            });
            break;

          default:
            reject(
              new HttpException('Invalid upload type', HttpStatus.BAD_REQUEST),
            );
        }
      });

      return next.handle();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
