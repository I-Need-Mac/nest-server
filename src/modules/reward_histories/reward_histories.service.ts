import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RewardHistories } from './reward_histories.entity';

@Injectable()
export class RewardHistoriesService {
  constructor(@InjectRepository(RewardHistories) private RewardHistoriesRepository: Repository<RewardHistories>) {
    this.RewardHistoriesRepository = RewardHistoriesRepository;
  }

  create(data: Partial<RewardHistories>): Promise<RewardHistories> {
    const newRewardHistories = this.RewardHistoriesRepository.create(data);
    return newRewardHistories.save();
  }
}
