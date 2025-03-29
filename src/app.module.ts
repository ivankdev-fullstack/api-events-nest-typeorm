import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { appConfig } from './config/app.config';
import { authConfig } from './config/auth.config';
import { typeOrmConfig } from './config/database.config';
import { TypedConfigService } from './config/typed-config.service';
import { appConfigSchema } from './config/types/config.types';
import { Event } from './event/entity/event.entity';
import { EventModule } from './event/event.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeOrmConfig, authConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configSecvice: TypedConfigService) => ({
        ...configSecvice.get('database'),
        entities: [User, Event],
      }),
    }),
    AuthModule,
    UserModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
