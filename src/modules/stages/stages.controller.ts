import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { StagesService } from './stages.service';
import { CreateStageDto } from './stages.dto';
import { ApiOperation } from '@nestjs/swagger';
import { encrypt } from '@utils/security';

@Controller('stage')
export class StagesController {
  constructor(private StagesService: StagesService) {}

  @ApiOperation({ summary: '스테이지 시작 시 요청' })
  @Post('/start')
  async create(@Body() createStageData: CreateStageDto) {
    console.log('in router :: ', createStageData);

    return {
      statusCode: HttpStatus.OK,
      message: 'Stage Save successfully',
    };
  }
}
