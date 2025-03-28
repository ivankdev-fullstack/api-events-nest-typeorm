import { ConfigService } from '@nestjs/config';
import { ConfigType } from './types/config.types';

export class TypedConfigService extends ConfigService<ConfigType> {}
