import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { StagesService } from './stages.service';
import { PresetsService } from '../presets/presets.service';
import { CreateStageDto } from './stages.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('stage')
export class StagesController {
  constructor(private stagesService: StagesService, private presetsService: PresetsService) {}

  @ApiOperation({ summary: '스테이지 시작 시 요청' })
  @Post('/start')
  async createStage(@Body() data: CreateStageDto) {
    console.log('in router :: ', data);

    const stage = await this.stagesService.create({
      steam_id: data.steam_id,
      stage: data.stage,
    });

    // const preset = await this.presetsService.create({
    //   saint_soul_type: data.saint_soul,
    //   soul1: data.soul.at(0),
    //   soul2: data.soul.at(1),
    //   soul3: data.soul.at(2),
    //   soul4: data.soul.at(3),
    //   soul5: data.soul.at(4),
    //   soul6: data.soul.at(5),
    // });

    // console.log(stage, preset);
    //굳이 리스폰스를 보내줘야하나 다시 이야기 해보기.
    if (stage) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
      };
    }
  }
}

/*
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { DogsService } from './dogs.service';
import { Cat } from './interfaces/cat.interface';
import { Dog } from './interfaces/dog.interface';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly dogsService: DogsService,
  ) {}

  // ... 기존 코드 생략 ...

  @Post('dogs')
  createDog(@Body() dog: Dog): void {
    this.dogsService.create(dog);
  }

  @Get('dogs')
  findAllDogs(): Dog[] {
    return this.dogsService.findAll();
  }
}
*/
