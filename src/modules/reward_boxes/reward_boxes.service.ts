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
  async getRewardBoxes(steam_id: string): Promise<RewardBoxes[]> {
    return await this.rewardBoxesRepository.find({ where: { steam_id } });
  }

  async openStart({ id, steam_id }: Partial<RewardBoxes>): Promise<RewardBoxes> {
    const rewardBox = await this.rewardBoxesRepository.findOne({ where: { id, steam_id } });
    if (!rewardBox) return null;

    rewardBox.open_start_time = new Date();
    return await this.rewardBoxesRepository.save(rewardBox);
  }
}
