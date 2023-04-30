import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';

import { StagesService } from './stages.service';
import { PresetsService } from '../presets/presets.service';
import { CreateStageDto } from './stages.dto';
import { ApiOperation } from '@nestjs/swagger';
import { encrypt } from '@utils/security';

@Controller('stage')
export class StagesController {
  constructor(private readonly StagesService: StagesService, private readonly PresetsService: PresetsService) {}

  @ApiOperation({ summary: '스테이지 시작 시 요청' })
  @Post('/start')
  async createStage(@Body() data: CreateStageDto) {
    console.log('in router :: ', data);

    if (data != undefined) {
      await this.StagesService.create({
        steam_id: data.steam_id,
        stage: data.stage,
        is_finished: true,
        is_clear: false,
        play_time: 0,
      });

      await this.PresetsService.create({
        steam_id: data.steam_id,
        saint_soul_type: data.saint_soul,
        soul1: Number(data.soul.at(0)),
        soul2: Number(data.soul.at(1)),
        soul3: Number(data.soul.at(2)),
        soul4: Number(data.soul.at(3)),
        soul5: Number(data.soul.at(4)),
        soul6: Number(data.soul.at(5)),
        character: '',
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'created successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'created failed',
      };
    }
  }
}
