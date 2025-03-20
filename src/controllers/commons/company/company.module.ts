import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COMPANY_MODEL, companySchema } from 'src/schemas/commons/company';
import { USER_MODEL, userSchema } from 'src/schemas/commons/user';
import { AppConfigService } from 'src/config';
import { CLIENT_MODEL, clientSchema } from 'src/schemas/client';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COMPANY_MODEL, schema: companySchema },
      { name: USER_MODEL, schema: userSchema },
      { name: CLIENT_MODEL, schema: clientSchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    AppConfigService,
    // UploadFileInterceptor,
    // {
    //   provide: getModelToken(USER_MODEL),
    //   useExisting: getModelToken(USER_MODEL),
    // },
  ],
  // exports: [UploadFileInterceptor],
})
export class CompanyModule {}
