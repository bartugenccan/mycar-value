import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Validation Pipe
import { ValidationPipe } from '@nestjs/common';

// Cookie Session
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asdf'],
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove properties that are not in the DTO
  }));
  await app.listen(3000);
}
bootstrap();
