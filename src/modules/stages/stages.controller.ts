import { Controller, Post, Body, HttpStatus, Res, Patch } from '@nestjs/common';

import { StagesService } from './stages.service';
import { PresetsService } from '../presets/presets.service';
import { AssetsService } from '../assets/assets.service';
import { CreateStageDto, UpdateStageDto } from './stages.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('stage')
export class StagesController {
  constructor(
    private readonly StagesService: StagesService,
    private readonly PresetsService: PresetsService,
    private readonly AssetsService: AssetsService,
  ) {}

  @ApiOperation({ summary: '스테이지 시작 시 요청' })
  @Post('/start')
  async createStage(@Body() data: CreateStageDto) {
    console.log('in router :: ', data);
    const asset = await this.AssetsService.findOne(data.steam_id);

    if (data != undefined) {
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
    } else {
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

    if (data != undefined) {
      const stage = await this.StagesService.update(data.stage_id, {
        is_clear: data.is_clear,
        play_time: data.paly_time,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'stage update successfully',
        data: {
          steam_id: stage.steam_id,
          stage: stage.stage,
          reward_box: data.reward_box,
          updated_at: stage.created_at,
        },
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'stage update failed',
      };
    }
  }
}
