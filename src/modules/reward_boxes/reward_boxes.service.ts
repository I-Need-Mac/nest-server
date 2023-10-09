import { Injectable } from '@nestjs/common';
import { RewardBoxes } from './reward_boxes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CharactersService } from '../characters/characters.service';
import { AssetsService } from '../assets/assets.service';

import { getRewardBoxObject } from '@/common/static/reward-box';
import { SoulsService } from '../souls/souls.service';

const SOUL_UNLOCK_COUNT = 7;

const checkCharacters = (userCharacters, rewardCharacter) => {
  const rewardCharacterName = rewardCharacter.split('_')[1].toLowerCase();
  return userCharacters[rewardCharacterName] === false;
};

const checkSouls = (userSouls, rewardSouls) => {
  const soulTypes = rewardSouls.split('_').slice(-2);
  const [saintSoulType, soulType] = soulTypes.map((s: string) => parseInt(s));
  const saintSoul = userSouls.filter((userSoul) => userSoul.saint_soul_type === saintSoulType)[0];

  return saintSoul[`soul${soulType}`] !== -1 && saintSoul[`soul${soulType}`] < SOUL_UNLOCK_COUNT;
};

const getRandomReward = (filteredReward) => {
  const totalWeight = filteredReward.reduce((sum, item) => sum + item.weight, 0);

  let randomNum = Math.random() * totalWeight;

  for (let i = 0; i < filteredReward.length; i++) {
    if (randomNum < filteredReward[i].weight) {
      return filteredReward[i];
    }
    randomNum -= filteredReward[i].weight;
  }
};

@Injectable()
export class RewardBoxesService {
  constructor(
    @InjectRepository(RewardBoxes)
    private rewardBoxesRepository: Repository<RewardBoxes>,
    private charactersService: CharactersService,
    private assetsService: AssetsService,
    private soulsService: SoulsService,
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

  async setRewardList({ steam_id, box_type }: { steam_id: string; box_type: number }) {
    const staticRewardBox = (await (await getRewardBoxObject())())[box_type];
    const characters = await this.charactersService.findOne(steam_id);
    const souls = await this.soulsService.findAll(steam_id);

    const getFilteredReward = () =>
      staticRewardBox.filter((reward) => {
        const rewardType = reward.item.split('_')[0];
        switch (rewardType) {
          case 'key':
          case 'box':
            return true;
          case 'character':
            return checkCharacters(characters, reward.item);
          case 'soul':
            return checkSouls(souls, reward.item);
        }
      });

    const selectedRewardList = [];

    for (let i = 0; i < 4; i++) {
      const filteredReward = getFilteredReward();
      if (filteredReward.length === 0) break;

      const reward = getRandomReward(filteredReward);
      selectedRewardList.push(reward);

      const rewardType = reward.item.split('_')[0];
      if (rewardType === 'character') {
        characters[reward.item.split('_')[1].toLowerCase()] = true;
      } else if (rewardType === 'soul') {
        const soulTypes = reward.item.split('_').slice(-2);
        const [saintSoulType, soulType] = soulTypes.map((s: string) => parseInt(s));
        const saintSoul = souls.filter((userSoul) => userSoul.saint_soul_type === saintSoulType)[0];

        saintSoul[`soul${soulType}`] += reward.amount;
      }
    }

    return selectedRewardList;
  }

  async openEnd({ id, steam_id }: Partial<RewardBoxes>): Promise<RewardBoxes> {
    const rewardBox = await this.rewardBoxesRepository.findOne({ where: { id, steam_id } });
    if (!rewardBox) return null;

    const selectedRewardList = await this.setRewardList({ steam_id: rewardBox.steam_id, box_type: rewardBox.box_type });

    for (let i = 0; i < selectedRewardList.length; i++) {
      const selectedReward = selectedRewardList[i];
      const rewardType = selectedReward.item.split('_')[0];
      switch (rewardType) {
        case 'key':
          const userAsset = await this.assetsService.findOne(steam_id);
          await this.assetsService.update(rewardBox.steam_id, userAsset.key + selectedReward.amount);
          break;
        case 'box':
          const boxType = selectedReward.item.split('_')[1];
          await this.create({ steam_id, box_type: boxType, stage_id: -1 });
          break;
        case 'character':
          const characterName = selectedReward.item.split('_')[1].toLowerCase();
          await this.charactersService.update(steam_id, characterName);
          break;
        case 'soul':
          const soulTypes = selectedReward.item.split('_').slice(-2);
          const [saintSoulType, soulType] = soulTypes.map((s: string) => parseInt(s));
          await this.soulsService.update(steam_id, saintSoulType, soulType, selectedReward.amount);
          break;
      }
    }

    console.log('=======selectedRewardList===========\n', selectedRewardList);

    rewardBox.is_open = true;
    return await this.rewardBoxesRepository.save(rewardBox);
  }
}
