import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COMPANY_MODEL, companySchema } from 'src/schemas/commons/company';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { UserModule } from 'src/controllers/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COMPANY_MODEL, schema: companySchema },
      { name: USER_MODEL, schema: userSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    // UploadFileInterceptor,
    // {
    //   provide: getModelToken(USER_MODEL),
    //   useExisting: getModelToken(USER_MODEL),
    // },
  ],
  // exports: [UploadFileInterceptor],
})
export class CompanyModule {}
