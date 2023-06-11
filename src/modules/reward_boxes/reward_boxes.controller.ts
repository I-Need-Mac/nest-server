import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RewardBoxesService } from './reward_boxes.service';
import { FindRewardBoxDto } from './reward_boxes.dto';

@Controller('reward-box')
export class RewardBoxesController {
  constructor(private rewardBoxesService: RewardBoxesService) {}

  @ApiOperation({ summary: 'reward box 정보 가져오기' })
  @Get('/user-own/:steam_id')
  async findSoul(@Param() data: FindRewardBoxDto) {
    const userRewardBoxes = await this.rewardBoxesService.getRewardBoxes(data.steam_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'find reward box success',
      data: userRewardBoxes,
    };
  }
}
