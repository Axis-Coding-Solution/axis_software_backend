import { Global, Module } from '@nestjs/common';
import { MenuPermissionGuard } from './permission.guard';
import { DataBaseModule } from '@/infra/mongoose/database.module';

@Global()
@Module({
  imports: [DataBaseModule],
  providers: [MenuPermissionGuard],
  exports: [MenuPermissionGuard],
})
export class GuardsModule {}
