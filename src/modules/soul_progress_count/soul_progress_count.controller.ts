import { Controller, Post, Body, HttpStatus, Get, Query, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SoulProgressCountService } from './soul_progress_count.service';
import { ProgressDto } from './soul_progress_count.dto';

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
      soul_name: data.soul_name,
      now_count: data.now_count,
      max_count: data.max_count,
    });

    const userProgress = await this.SoulProgressCountService.findOne({
      steam_id: data.steam_id,
      souls_id: data.souls_id,
      soul_name: data.soul_name,
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
}
