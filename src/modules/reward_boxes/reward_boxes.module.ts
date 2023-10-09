import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DecryptionMiddleware } from '@/common/utils/middleware';

import { RewardBoxesService } from './reward_boxes.service';
import { RewardBoxesController } from './reward_boxes.controller';
import { RewardBoxes } from './reward_boxes.entity';

import { CharactersService } from '../characters/characters.service';
import { AssetsService } from '../assets/assets.service';
import { CharactersModule } from '../characters/characters.module';
import { AssetsModule } from '../assets/assets.module';
import { Assets } from '../assets/assets.entity';
import { Characters } from '../characters/characters.entity';
import { SaintSoulsModule } from '../saint_souls/saint_souls.module';
import { SaintSouls } from '../saint_souls/saint_souls.entity';
import { SaintSoulsService } from '../saint_souls/saint_souls.service';
import { SoulsModule } from '../souls/souls.module';
import { SoulsService } from '../souls/souls.service';
import { Souls } from '../souls/souls.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RewardBoxes, Assets, Characters, SaintSouls, Souls]),
    CharactersModule,
    AssetsModule,
    SaintSoulsModule,
    SoulsModule,
  ],
  providers: [RewardBoxesService, AssetsService, CharactersService, SaintSoulsService, SoulsService],
  controllers: [RewardBoxesController],
  exports: [RewardBoxesService],
})
export class RewardBoxesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude({
        path: 'reward-box/user-own/:steam_id',
        method: RequestMethod.GET,
      })
      .forRoutes('reward-box');
  }
}
