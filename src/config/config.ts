import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const envPort = process.env.PORT || 4000;
export const envDatabaseUri = process.env.DATABASE_URI;
export const envMODE = process.env.MODE;
export const envTokenExpiresIn = process.env.TOKEN_EXPIRE_IN;
export const envJwtKey = process.env.JWT_KEY;
export const envLocalBackendUrl = configService.get<string>('LOCAL_BACKEND_URL');
export const envProdBackendUrl = process.env.PROD_BACKEND_URL;

export const SERVER_PATH =
  process.env.MODE === 'prod' ? process.env.PROD_BACKEND_URL : process.env.LOCAL_BACKEND_URL;
