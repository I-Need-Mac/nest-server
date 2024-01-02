import { Controller, HttpStatus, Get, Query, Patch, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PresetsService } from './presets.service';
import { SelectPresetDto, UpdateCharacterDto } from './presets.dto';
import { characterNames } from '@/modules/characters/characters';

@Controller('preset')
export class PresetsController {
  constructor(private PresetsService: PresetsService) {}

  @ApiOperation({ summary: 'preset soul 정보 가져오기' })
  @Get('/soul')
  async findSoul(@Query() data: SelectPresetDto) {
    if (data === null || data === undefined) throw new Error('Data does not exist.');

    const { steam_id } = data;

    const preset = await this.PresetsService.findOne(steam_id);
    console.log('in router :: ', steam_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'preset select data successfully',
      data: {
        saint_soul_type: preset.saint_soul_type,
        soul1: preset.soul1,
        soul2: preset.soul2,
        soul3: preset.soul3,
        soul4: preset.soul4,
        soul5: preset.soul5,
        soul6: preset.soul6,
      },
    };
  }

  @ApiOperation({ summary: 'preset character 정보 가져오기' })
  @Get('/character')
  async findCharacter(@Query() data: SelectPresetDto) {
    if (data === null || data === undefined) throw new Error('Data does not exist.');

    const { steam_id } = data;

    const preset = await this.PresetsService.findOne(steam_id);
    console.log('in router :: ', steam_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'preset select data successfully',
      data: {
        character: preset.character,
      },
    };
  }

  @ApiOperation({ summary: 'preset character 정보 업데이트' })
  @Patch('/character')
  async updateCharacter(@Body() data: UpdateCharacterDto) {
    if (data === null || data === undefined) throw new Error('Data does not exist.');

    const { steam_id, character } = data;
    if (!characterNames.includes(character.toLocaleLowerCase())) throw new Error('character is not valid');

    const preset = await this.PresetsService.update(steam_id, { character });
    console.log('in router :: ', steam_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'preset update data successfully',
      data: {
        character: preset.character,
      },
    };
  }
}
