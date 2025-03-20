import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get mode(): string {
    return this.configService.get<string>('MODE', 'dev'); //* Default: 'dev'
  }

  get localBackendUrl(): string {
    return this.configService.get<string>('LOCAL_BACKEND_URL');
  }

  get prodBackendUrl(): string {
    return this.configService.get<string>('PROD_BACKEND_URL');
  }

  get serverPath(): string {
    return this.mode === 'prod' ? this.prodBackendUrl : this.localBackendUrl;
  }

  get databaseUri(): string {
    return this.configService.get<string>('DATABASE_URI');
  }

  get jwtKey(): string {
    return this.configService.get<string>('JWT_KEY');
  }

  get tokenExpiresIn(): string {
    return this.configService.get<string>('TOKEN_EXPIRE_IN', '1h'); //* Default: 1 hour
  }

  get port(): number {
    return Number(this.configService.get<number>('PORT', 4000)); //* Default: 4000
  }

  get saltRounds(): number {
    return Number(this.configService.get<number>('SALT_ROUNDS', 10)); //* Default: 10
  }
}
