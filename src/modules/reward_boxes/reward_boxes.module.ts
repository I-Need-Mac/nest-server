import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DecryptionMiddleware } from '@/common/utils/middleware';

import { RewardBoxesService } from './reward_boxes.service';
import { RewardBoxesController } from './reward_boxes.controller';
import { RewardBoxes } from './reward_boxes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RewardBoxes])],
  providers: [RewardBoxesService],
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
