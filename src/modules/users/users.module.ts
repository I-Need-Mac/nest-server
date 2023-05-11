import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Assets } from '@/modules/assets/assets.entity';
import { Characters } from '@/modules/characters/characters.entity';
import { Souls } from '@/modules/souls/souls.entity';
import { Presets } from '@/modules/presets/presets.entity';
import { SaintSouls } from '@/modules/saint_souls/saint_souls.entity';

import { AssetsService } from '@/modules/assets/assets.service';
import { CharactersService } from '@/modules/characters/characters.service';
import { SoulsService } from '@/modules/souls/souls.service';
import { PresetsService } from '@/modules/presets/presets.service';
import { SaintSoulsService } from '@/modules/saint_souls/saint_souls.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './users.middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Assets, Characters, Souls, Presets, SaintSouls])],
  providers: [
    UsersService,
    AssetsService,
    CharactersService,
    SoulsService,
    PresetsService,
    SaintSoulsService,
    GlobalHttpExceptionFilter,
    GlobalValidationPipe,
  ],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude(
        {
          path: 'auth/duplicated',
          method: RequestMethod.GET,
        },
        {
          path: 'auth/users',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('auth');
  }
}
