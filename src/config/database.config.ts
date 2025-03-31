import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      synchronize: Boolean(parseInt(process.env.DATABASE_SYNC ?? '0')),
    };
  },
);
