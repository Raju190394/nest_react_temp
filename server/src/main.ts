import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Performance: Enable Gzip compression
  app.use(compression());

  // Security/Performance: Global Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
