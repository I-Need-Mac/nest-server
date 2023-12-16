import { Module } from '@nestjs/common';
import { RewardHistoriesService } from './reward_histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardHistories } from './reward_histories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RewardHistories])],
  providers: [RewardHistoriesService],
  exports: [RewardHistoriesService],
})
export class RewardHistoriesModule {}
