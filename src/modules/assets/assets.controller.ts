import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { updateAssetKeyDto } from './assets.dto';
import { AssetsService } from './assets.service';
@Controller('assets')
export class AssetsController {
  constructor(private AssetsService: AssetsService) {}

  @ApiOperation({ summary: '키 개수 조정' })
  @Patch('/keys')
  async updateAssetKey(@Body() data: updateAssetKeyDto) {
    const { steam_id, key } = data;

    try {
      const asset = await this.AssetsService.update(steam_id, key);

      return {
        statusCode: 200,
        message: 'asset update successfully',
        data: asset,
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 400,
        message: 'asset update failed',
      };
    }
  }
}
