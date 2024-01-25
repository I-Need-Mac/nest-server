import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { SoulProgressCount } from './soul_progress_count.entity';
import { SoulProgressCountService } from './soul_progress_count.service';
import { SoulProgressCountController } from './soul_progress_count.controller';

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
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([SoulProgressCount, Users, Assets, Characters, Souls, Presets, SaintSouls])],
  providers: [
    SoulProgressCountService,
    AssetsService,
    CharactersService,
    SoulsService,
    PresetsService,
    SaintSoulsService,
    GlobalHttpExceptionFilter,
    GlobalValidationPipe,
    UsersService,
  ],
  controllers: [SoulProgressCountController],
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
