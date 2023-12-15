import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SelectAllDto } from './game.dto';
import { StagesService } from '../stages/stages.service';
import HttpStatus from '@/common/types/status';
import { PresetsService } from '../presets/presets.service';
import { AssetsService } from '../assets/assets.service';
import { SaintSoulsService } from '../saint_souls/saint_souls.service';
import { SoulsService } from '../souls/souls.service';
import { CharactersService } from '../characters/characters.service';

@Controller('game')
export class GameController {
  constructor(
    private stageService: StagesService,
    private persetService: PresetsService,
    private assetsService: AssetsService,
    private saintSoulsService: SaintSoulsService,
    private soulsService: SoulsService,
    private charactersService: CharactersService,
  ) {}

  @ApiOperation({ summary: '게임 시작 시 요청' })
  @Get('/start')
  async selectAll(@Query() data: SelectAllDto) {
    console.log('in router :: ', data);

    if (data === null || data === undefined) throw new Error('Data does not exist.');
    const lastStage = await this.stageService.lastStageSelect(data.steam_id);
    const highStage = await this.stageService.highStageSelect(data.steam_id);
    const preset = await this.persetService.findOne(data.steam_id);
    const asset = await this.assetsService.findOne(data.steam_id);
    const character = await this.charactersService.findOne(data.steam_id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Select all successfully',
      data: {
        steam_id: data.steam_id,
        high_stage: highStage.stage,
        last_stage: lastStage.stage,
        last_is_finished: lastStage.is_finished,
        last_is_clear: lastStage.is_clear,
        last_saint_soul_type: preset.saint_soul_type,
        last_soul1: preset.soul1,
        last_soul2: preset.soul2,
        last_soul3: preset.soul3,
        last_soul4: preset.soul4,
        last_soul5: preset.soul5,
        last_soul6: preset.soul6,
        last_character: preset.character,
        key: asset.key,
        hojin: character.hojin,
        seimei: character.seimei,
        macia: character.macia,
        sinwol: character.sinwol,
        siWoo: character.siWoo,
        ulises: character.ulises,
      },
    };
  }
}
