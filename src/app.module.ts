import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import GlobalImports from './app.imports';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { MenuPermissionGuard } from './common/guards/permission.guard';
@Module({
  imports: GlobalImports,
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: UploadFileInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: MenuPermissionGuard,
    // },
  ],
})
export class AppModule {}
