import { Controller, Post, Body, HttpStatus, Get, Query, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SoulProgressCountService } from './soul_progress_count.service';
import { ProgressDto, SelectProgressDto } from './soul_progress_count.dto';

@Controller('soul-progress-count')
export class SoulProgressCountController {
  constructor(private SoulProgressCountService: SoulProgressCountService) {}
  @ApiOperation({ summary: '진척도 업데이트' })
  @Patch('/progress')
  async updateProgress(@Body() data: ProgressDto) {
    console.log('in router :: ', data);

    if (data === null || data === undefined) throw new Error('Data does not exist.');

    const soulProgress = await this.SoulProgressCountService.update({
      steam_id: data.steam_id,
      souls_id: data.souls_id,
      now_count_list: data.now_count_list,
    });

    const userProgress = await this.SoulProgressCountService.findOne({
      steam_id: data.steam_id,
      souls_id: data.souls_id,
    });

    if (soulProgress === undefined) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Soul Progress data does not exist.',
      };
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Soul Progress update successfully',
        data: {
          userProgress,
        },
      };
    }
  }

  @ApiOperation({ summary: '진척도 데이터 (soul_id를 빈 값으로 전송 시 유저의 전체 진척도 리스트 출력)' })
  @Get('/soul-progress')
  async selectSoulProgress(@Query() data: SelectProgressDto) {
    console.log('in router : ', data);

    if (data === null || data === undefined) throw new Error('Data does not exist.');

    if (data.steam_id && data.souls_id) {
      const soul_progress = await this.SoulProgressCountService.findOne({
        steam_id: data.steam_id,
        souls_id: data.souls_id,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'select successfully',
        data: soul_progress,
      };
    } else if (data.steam_id && (data.souls_id === null || data.souls_id === undefined)) {
      const user_soul_progress = await this.SoulProgressCountService.findAll(data.steam_id);

      return {
        statusCode: HttpStatus.OK,
        message: 'select successfully',
        data: user_soul_progress,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'select failed',
      };
    }
  }
}
