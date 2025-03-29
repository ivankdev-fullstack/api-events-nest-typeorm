import { ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const appConfigStore: ConfigType<typeof appConfig> = app.get(appConfig.KEY);

  await app.listen(appConfigStore.port);
}
bootstrap();
