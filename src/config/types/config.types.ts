import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppConfig } from '../app.config';
import { AuthConfig } from '../auth.config';

export interface ConfigType {
  app: AppConfig;
  auth: AuthConfig;
  database: TypeOrmModuleOptions;
}

export const appConfigSchema = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNC: Joi.number().valid(0, 1).required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('60m').required(),
});
