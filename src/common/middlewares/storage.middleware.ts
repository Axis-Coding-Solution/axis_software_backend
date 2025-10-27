import { diskStorage } from 'multer';
import * as path from 'path';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.resolve(`${process.cwd()}/uploads/images`));
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, path.resolve(`${process.cwd()}/uploads/videos`));
    } else {
      cb(null, path.resolve(`${process.cwd()}/uploads/files`));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    const fileName = `${uniqueSuffix}${fileExt}`;
    cb(null, fileName);
  },
});
