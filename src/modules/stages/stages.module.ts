import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

import { Stages } from './stages.entity';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';

import { DecryptionMiddleware } from '@/common/utils/middleware';
import { PresetsService } from '@presets/presets.service';
import { Presets } from '@presets/presets.entity';
import { AssetsService } from '@assets/assets.service';
import { Assets } from '@assets/assets.entity';
import { RewardBoxes } from '@reward_boxes/reward_boxes.entity';
import { RewardBoxesService } from '@reward_boxes/reward_boxes.service';
import { CharactersModule } from '../characters/characters.module';
import { SaintSoulsModule } from '../saint_souls/saint_souls.module';
import { SoulsModule } from '../souls/souls.module';
import { RewardHistoriesModule } from '../reward_histories/reward_histories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stages, Presets, Assets, RewardBoxes]),
    CharactersModule,
    SaintSoulsModule,
    SoulsModule,
    RewardHistoriesModule,
  ],
  providers: [
    StagesService,
    PresetsService,
    AssetsService,
    RewardBoxesService,
    GlobalHttpExceptionFilter,
    GlobalValidationPipe,
  ],
  controllers: [StagesController],
})
export class StagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude({
        path: 'stage/ranking',
        method: RequestMethod.GET,
      })
      .forRoutes('stage');
  }
}
