import { Injectable } from '@nestjs/common';
import { RewardBoxes } from './reward_boxes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RewardBoxesService {
  constructor(@InjectRepository(RewardBoxes) private rewardBoxesRepository: Repository<RewardBoxes>) {
    this.rewardBoxesRepository = rewardBoxesRepository;
  }
  async create({ steam_id, box_type, stage_id }: Partial<RewardBoxes>): Promise<RewardBoxes> {
    const newRewardBox = this.rewardBoxesRepository.create({ steam_id, box_type, stage_id });
    return newRewardBox.save();
  }
}
