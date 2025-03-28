import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

console.log(process.env.DATABASE_URL);

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
});
