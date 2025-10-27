import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createDocument(app: INestApplication) {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.setBasePath)
    .setDescription(SWAGGER_CONFIG.setDescription)
    .setVersion(SWAGGER_CONFIG.setVersion)
    .build();

  const document = SwaggerModule.createDocument(app, builder);

  SwaggerModule.setup(SWAGGER_CONFIG.setBasePath, app, document);
}
