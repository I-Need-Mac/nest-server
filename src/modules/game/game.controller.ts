import { Body, Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SelectAllDto } from './game.dto';
import { StagesService } from '../stages/stages.service';
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

    // 스테이지가 없을 수도 있음
    if (data === null || data === undefined) throw new Error('Data does not exist.');
    const lastStage = await this.stageService.lastStageSelect(data.steam_id);
    const highStage = await this.stageService.highStageSelect(data.steam_id);

    // 없으면 안돼는 것
    const preset = await this.persetService.findOne(data.steam_id);
    const asset = await this.assetsService.findOne(data.steam_id);
    const character = await this.charactersService.findOne(data.steam_id);

    if (preset === undefined) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Preset data does not exist.',
      };
    } else if (asset === undefined) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'asset data does not exist.',
      };
    } else if (character === undefined) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'character data does not exist.',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Select all successfully',
      data: {
        steam_id: data.steam_id,
        high_stage: highStage ? highStage.stage : '',
        last_stage: lastStage ? lastStage.stage : '',
        last_is_finished: lastStage ? lastStage.is_finished : '',
        last_is_clear: lastStage ? lastStage.is_clear : '',
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
