import { Body, Controller, Patch, HttpStatus } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiOperation } from '@nestjs/swagger';
import { updateCharacterDto } from './characters.dto';
import { AssetsService } from '../assets/assets.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService, private assetsService: AssetsService) {}

  @ApiOperation({ summary: '캐릭터 해금' })
  @Patch('/open')
  async updateCharacter(@Body() data: updateCharacterDto) {
    console.log('in router :: ', data);

    if (data === null || data === undefined) throw new Error('Data does not exist.');
    const asset = await this.assetsService.findOne(data.steam_id);

    const sum = asset.key - data.key;
    if (sum >= 0 && data.key != 0) {
      await this.assetsService.update(data.steam_id, sum);
      await this.charactersService.update(data.steam_id, data.character);

      return {
        statusCode: HttpStatus.OK,
        message: 'asset & charaters update successfully',
        data: data.steam_id,
      };
    } else if (data.key == 0) {
      await this.charactersService.update(data.steam_id, data.character);

      return {
        statusCode: HttpStatus.OK,
        message: 'charaters update successfully',
        data: data.steam_id,
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'key update failed',
    };
  }
}
