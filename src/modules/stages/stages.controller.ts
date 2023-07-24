import { ApiOperation } from '@nestjs/swagger';
import { Controller, Post, Body, HttpStatus, Patch } from '@nestjs/common';

import { CreateStageDto, UpdateStageDto } from './stages.dto';

import { StagesService } from './stages.service';
import { PresetsService } from '@presets/presets.service';
import { AssetsService } from '@assets/assets.service';
import { RewardBoxesService } from '@reward_boxes/reward_boxes.service';

@Controller('stage')
export class StagesController {
  constructor(
    private readonly StagesService: StagesService,
    private readonly PresetsService: PresetsService,
    private readonly AssetsService: AssetsService,
    private readonly RewardBoxesService: RewardBoxesService,
  ) {}

  @ApiOperation({ summary: '스테이지 시작 시 요청' })
  @Post('/start')
  async createStage(@Body() data: CreateStageDto) {
    console.log('in router :: ', data);
    const asset = await this.AssetsService.findOne(data.steam_id);

    try {
      if (data == null) throw new Error('data is null');
      if (data.soul.length != 6) throw new Error('soul length is not 6');

      if (asset.key != 0) {
        const key_sum = asset.key - data.key;

        if (key_sum >= 0) {
          await this.AssetsService.update(data.steam_id, key_sum);
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'asset update failed',
          };
        }
      }
      const stage = await this.StagesService.create({
        steam_id: data.steam_id,
        stage: data.stage,
        is_finished: false,
        is_clear: false,
        play_time: 0,
      });

      await this.PresetsService.update(data.steam_id, {
        saint_soul_type: data.saint_soul,
        soul1: data.soul[0],
        soul2: data.soul[1],
        soul3: data.soul[2],
        soul4: data.soul[3],
        soul5: data.soul[4],
        soul6: data.soul[5],
        character: data.character,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'created successfully',
        data: {
          steam_id: stage.steam_id,
          stage_id: stage.id,
          stage: stage.stage,
          created_at: stage.created_at,
        },
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'created failed',
      };
    }
  }

  @ApiOperation({ summary: '스테이지 종료 시 요청' })
  @Patch('/end')
  async updateStage(@Body() data: UpdateStageDto) {
    //리워드 박스 업데이트는 추후 구현
    console.log('in router :: ', data);

    try {
      if (data == null) throw new Error('data is null');
      if (data.reward_box.length > 4 || data.reward_box.length === 0) throw new Error('reward box length is over 4');

      const stage = await this.StagesService.update(data.stage_id, {
        is_clear: data.is_clear,
        play_time: data.paly_time,
      });
      if (data.reward_box.length > 4 || data.reward_box.length === 0) throw new Error('reward box length is over 4');

      const rewardBox = await Promise.all(
        data.reward_box.map(async (box_type) => {
          return this.RewardBoxesService.create({
            steam_id: data.steam_id,
            box_type,
            stage_id: data.stage_id,
          });
        }),
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'stage update successfully',
        data: {
          steam_id: stage.steam_id,
          stage: stage.stage,
          reward_box: rewardBox,
          updated_at: stage.created_at,
        },
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'stage update failed',
      };
    }
  }
}
