import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckDbConnectionCommand } from './command';
import GlobalImports from './app.imports';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
