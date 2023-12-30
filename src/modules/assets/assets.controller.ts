import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { getAssetsDto, updateAssetKeyDto } from './assets.dto';
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
  @ApiOperation({ summary: 'asset 데이터 확인' })
  @Get('/')
  async getAssets(@Query() data: getAssetsDto) {
    const { steam_id } = data;

    try {
      const assets = await this.AssetsService.findOne(steam_id);

      return {
        statusCode: 200,
        message: 'asset update successfully',
        data: assets,
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
