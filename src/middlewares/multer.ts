import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { notFoundException } from 'src/util';

@Injectable()
export class UploadFileMiddleware implements NestMiddleware {
  /**
   * Factory method to create middleware for file uploads
   * @param model - The Mongoose model to fetch user data
   * @param type - The upload type (e.g., 'single', 'array', etc.)
   * @param name - The field name for the file in the request
   * @param subDirectory - Subdirectory for storing the file
   * @returns Middleware function
   */
  createMiddleware =
    (model: Model<any>, type: string, name: string, subDirectory: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Get user ID from the request (adjust based on your auth mechanism)
        const { id } = req['user'];

        // Fetch user details dynamically based on the provided model
        const user = await model.findById(id);

        if (!user || !user.username) {
          throw notFoundException('User not found');
        }

        // Generate a clean and safe username for the directory
        const authenticUsername = user.username.replace(/[^a-zA-Z0-9]/g, '');
        const targetDirectory = path.join(
          process.cwd(),
          'uploads',
          'images',
          authenticUsername,
          subDirectory,
        );

        // Create the target directory if it doesn't exist
        if (!fs.existsSync(targetDirectory)) {
          fs.mkdirSync(targetDirectory, { recursive: true });
        }

        // Configure Multer storage
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

        // Execute the multer upload
        upload[type](name)(req, res, (err: any) => {
          if (err) {
            throw new HttpException(
              err.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
          next();
        });
      } catch (error) {
        next(error);
      }
    };

  /**
   * Default `use` method implementation
   */
  use(req: Request, res: Response, next: NextFunction) {
    throw new HttpException(
      'UploadFileMiddleware requires configuration. Use the `createMiddleware` method instead.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
