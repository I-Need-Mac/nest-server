import { Injectable } from '@nestjs/common';
import { RewardBoxes } from './reward_boxes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CharactersService } from '../characters/characters.service';
import { AssetsService } from '../assets/assets.service';
import { SaintSoulsService } from '../saint_souls/saint_souls.service';

import { getRewardBoxObject } from '@/common/static/reward-box';
import { SoulsService } from '../souls/souls.service';

@Injectable()
export class RewardBoxesService {
  constructor(
    @InjectRepository(RewardBoxes)
    private rewardBoxesRepository: Repository<RewardBoxes>,
    private charactersService: CharactersService,
    private assetsService: AssetsService,
    private saintSoulsService: SaintSoulsService,
    private souls: SoulsService,
  ) {
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

  async setReward({ steam_id, box_type }: { steam_id: string; box_type: number }) {
    const getStaticRewardBox = (await (await getRewardBoxObject())())[box_type];
    const characters = await this.charactersService.findOne(steam_id);
    const assets = await this.assetsService.findOne(steam_id);
    const saintSouls = await this.saintSoulsService.findOne(steam_id);
    const souls = await this.souls.findAll(steam_id);

    console.log('getStaticRewardBox :: ', getStaticRewardBox);
    console.log('characters :: ', characters);
    console.log('saintSouls :: ', assets);
    console.log('assets :: ', saintSouls);
    console.log('souls :: ', souls);

    return;
  }

  async openEnd({ id, steam_id }: Partial<RewardBoxes>): Promise<RewardBoxes> {
    const rewardBox = await this.rewardBoxesRepository.findOne({ where: { id, steam_id } });
    if (!rewardBox) return null;

    this.setReward({ steam_id: rewardBox.steam_id, box_type: rewardBox.box_type });

    // rewardBox.is_open = true;
    return await this.rewardBoxesRepository.save(rewardBox);
  }
}
