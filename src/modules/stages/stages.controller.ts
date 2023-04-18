import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { StagesService } from './stages.service';
import { CreateStageDto } from './stages.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('stage')
export class StagesController {
  constructor(private StagesService: StagesService) {}

  @ApiOperation({ summary: '스테이지 시작 시 요청' })
  @Post('/start')
  async create(@Body() createStageData: CreateStageDto) {
    console.log('in router :: ', createStageData);

    // insert stage table data
    // const stage = await this.StagesService.create(createStageData);
    // const soul = await this.UsersService.createSoul(createStageData);

    return {
      statusCode: HttpStatus.OK,
      message: 'Stage Save successfully',
    };
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
