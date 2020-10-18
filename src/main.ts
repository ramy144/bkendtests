import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DefaultValidationPipe } from './common/pipe/default-validation.pipe';
import { Swagger } from './common/utils/swagger';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
require('dotenv').config()
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const reflector = app.get(Reflector)

  app.useGlobalPipes(new DefaultValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalGuards(
    new JwtAuthGuard(reflector),

  );

  Swagger.setup(app);


  await app.listen(process.env.PORT, () => console.log("Listening on port ", process.env.PORT));
}
bootstrap();
