import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { COMPANY_MODEL, companySchema } from 'src/schemas/commons/company';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { UploadFileInterceptor } from 'src/middlewares';
import { UserModule } from 'src/controllers/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COMPANY_MODEL, schema: companySchema },
    ]),
    UserModule,
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    UploadFileInterceptor,
    // {
    //   provide: getModelToken(USER_MODEL),
    //   useExisting: getModelToken(USER_MODEL),
    // },
  ],
  // exports: [UploadFileInterceptor],
})
export class CompanyModule {}
