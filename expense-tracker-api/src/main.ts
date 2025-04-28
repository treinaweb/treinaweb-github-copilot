import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // We're using Zod for validation through our custom ZodValidationPipe
  // rather than NestJS's built-in ValidationPipe, so we don't need
  // to set up a global validation pipe here

  logger.log(`Application is running on: http://localhost:3000`);
  await app.listen(3000);
}

// Add the void operator to handle the floating promise
void bootstrap();
