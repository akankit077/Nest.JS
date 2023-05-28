import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { checkDatabaseConnection } from './database/database.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await checkDatabaseConnection();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
