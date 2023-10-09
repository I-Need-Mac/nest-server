import { Module } from '@nestjs/common';
import { RewardHistoriesController } from './reward_histories.controller';
import { RewardHistoriesService } from './reward_histories.service';

@Module({
  controllers: [RewardHistoriesController],
  providers: [RewardHistoriesService],
})
export class RewardHistoriesModule {}
