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
import { DecryptionMiddleware } from '@/common/utils/middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';
import { SoulProgressCountService } from '../soul_progress_count/soul_progress_count.service';
import { SoulProgressCount } from '../soul_progress_count/soul_progress_count.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Assets, Characters, Souls, Presets, SaintSouls, SoulProgressCount])],
  providers: [
    UsersService,
    AssetsService,
    CharactersService,
    SoulsService,
    PresetsService,
    SaintSoulsService,
    SoulProgressCountService,
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
