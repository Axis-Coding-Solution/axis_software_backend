import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckDbConnectionCommand } from './command';
import GlobalImports from './app.imports';
@Module({
  imports: GlobalImports,
  controllers: [AppController],
  providers: [
    AppService,
    // CheckDbConnectionCommand,
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: UploadFileInterceptor,
    // },
  ],
})
export class AppModule {}
