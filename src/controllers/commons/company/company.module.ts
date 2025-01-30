import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COMPANY_MODEL, companySchema } from 'src/schemas/commons/company';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COMPANY_MODEL, schema: companySchema },
      { name: USER_MODEL, schema: userSchema },
    ]),
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
