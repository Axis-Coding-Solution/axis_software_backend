import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckDbConnectionCommand } from './command';
import globalImports from './app.imports';
@Module({
  imports: globalImports,
  controllers: [AppController],
  providers: [
    AppService,
    CheckDbConnectionCommand,
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: UploadFileInterceptor,
    // },
  ],
})
export class AppModule {}
