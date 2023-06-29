import { MiddlewareConsumer, Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Stages, Presets, Assets, RewardBoxes])],
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
    consumer.apply(DecryptionMiddleware).forRoutes('stage');
  }
}
