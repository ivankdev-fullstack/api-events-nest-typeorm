import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    console.log();
    console.log('==================================');
    console.log();
    console.log(process.env.DATABASE_URL);
    console.log(process.env.DATABASE_NAME);
    console.log(process.env.DB_SYNC);
    console.log(process.env.JWT_SECRET);
    console.log();
    console.log('==================================');
    console.log();
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      synchronize: Boolean(parseInt(process.env.DB_SYNC ?? '0')),
    };
  },
);
