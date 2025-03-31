import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { authConfig } from './config/auth.config';
import { typeOrmConfig } from './config/database.config';
import { TypedConfigService } from './config/typed-config.service';
import { Event } from './event/entity/event.entity';
import { EventModule } from './event/event.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { appConfigSchema } from './config/types/config.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig, authConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: false,
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
