import { Body, Controller, Get, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RewardBoxesService } from './reward_boxes.service';
import { FindRewardBoxDto, RewardBoxOpenStartDto, RewardBoxOpenEndDto } from './reward_boxes.dto';

@Controller('reward-box')
export class RewardBoxesController {
  constructor(private rewardBoxesService: RewardBoxesService) {}

  @ApiOperation({ summary: 'reward box 정보 가져오기' })
  @Get('/user-own/:steam_id')
  async findSoul(@Param() data: FindRewardBoxDto) {
    if (data === null || data === undefined) throw new Error('Data does not exist.');

    const userRewardBoxes = await this.rewardBoxesService.getRewardBoxes(data.steam_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'find reward box success',
      data: userRewardBoxes,
    };
  }

  @ApiOperation({ summary: 'reward box 열기 시작!' })
  @Patch('/open-start')
  async openStart(@Body() data: RewardBoxOpenStartDto) {
    try {
      const userRewardBoxes = await this.rewardBoxesService.openStart({ id: data.id, steam_id: data.steam_id });

      if (userRewardBoxes == null) throw new Error('reward box open start failed');

      return {
        statusCode: HttpStatus.OK,
        message: 'open reward box start success',
        data: userRewardBoxes,
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'box open start failed',
        data: null,
      };
    }
  }

  @ApiOperation({ summary: 'reward box 보상 받기 !' })
  @Patch('/open-end')
  async openEnd(@Body() data: RewardBoxOpenEndDto) {
    try {
      const validation = await this.rewardBoxesService.validate({ id: data.id, steam_id: data.steam_id });

      if (!validation) {
        console.log('---------------reward box time validation failed');
        throw new Error('reward box time validation failed');
      }

      const userRewardBoxHistory = await this.rewardBoxesService.openEnd({ id: data.id, steam_id: data.steam_id });

      if (userRewardBoxHistory == null) throw new Error('reward box open end failed');

      const rewardHistory = ['reward1', 'reward2', 'reward3', 'reward4'].reduce((acc, cur) => {
        if (userRewardBoxHistory[cur] != null) {
          return { ...acc, [cur]: JSON.parse(userRewardBoxHistory[cur]) };
        }
        return acc;
      }, userRewardBoxHistory);

      return {
        statusCode: HttpStatus.OK,
        message: 'open reward box end success',
        data: rewardHistory,
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'box open end failed',
        data: null,
      };
    }
  }
}
