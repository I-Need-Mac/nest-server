import { Body, Controller, Patch, HttpStatus } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiOperation } from '@nestjs/swagger';
import { initializeCharacterDto, updateCharacterDto } from './characters.dto';
import { AssetsService } from '../assets/assets.service';

import { characterKeys } from './characters';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService, private assetsService: AssetsService) {}

  @ApiOperation({ summary: '캐릭터 해금' })
  @Patch('/open')
  async updateCharacter(@Body() data: updateCharacterDto) {
    console.log('in router :: ', data);

    if (data === null || data === undefined) throw new Error('Data does not exist.');
    const asset = await this.assetsService.findOne(data.steam_id);

    data.character = data.character.toLocaleLowerCase();

    const sum = asset.key - characterKeys[data.character];
    if (sum >= 0 && characterKeys[data.character] != 0) {
      await this.assetsService.update(data.steam_id, sum);
      await this.charactersService.update(data.steam_id, data.character);

      return {
        statusCode: HttpStatus.OK,
        message: 'asset & charaters update successfully',
        data: { steam_id: data.steam_id, keys: sum, character: data.character },
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'key update failed',
    };
  }
  @ApiOperation({ summary: '캐릭터 해금 초기화 (테스트용)' })
  @Patch('/initialize')
  async initializeCharacter(@Body() data: initializeCharacterDto) {
    console.log('in router :: ', data);

    if (data === null || data === undefined) throw new Error('Data does not exist.');
    try {
      await this.charactersService.initializeCharacter(data.steam_id);
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'key update failed',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'initialize successfully',
    };
  }
}
