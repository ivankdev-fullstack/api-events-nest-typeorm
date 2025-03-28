import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export const authConfig = registerAs(
  'auth',
  (): AuthConfig => ({
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '60m',
  }),
);
