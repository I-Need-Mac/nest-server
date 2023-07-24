import { Controller, Body, HttpStatus, Patch, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SelectAllSoulDto, updateSoulDto } from './souls.dto';
import { SoulsService } from './souls.service';

import { SaintSoulsService } from '@saint_souls/saint_souls.service';

@Controller('souls')
export class SoulsController {
  constructor(private SoulsService: SoulsService, private SaintSoulsService: SaintSoulsService) {}

  @ApiOperation({ summary: '소울 해금' })
  @Patch('/open')
  async updateSoul(@Body() data: updateSoulDto) {
    if (data.flag === 1) {
      const count = await this.SoulsService.soulCount(data.steam_id, data.saint_soul, data.soul);
      if (count >= 7) {
        const soul = await this.SoulsService.unlockUpdate(data.steam_id, data.saint_soul, data.soul);
        if (soul) {
          return {
            statusCode: HttpStatus.OK,
            message: 'soul update successfully',
            data: {
              steam_id: soul.steam_id,
              saint_soul: soul.saint_soul_type,
              soul: data.soul,
            },
          };
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'soul update failed',
          };
        }
      }
    } else if (data.flag === 2) {
      const soul = await this.SoulsService.unlockUpdate(data.steam_id, data.saint_soul, data.soul);
      if (soul) {
        return {
          statusCode: HttpStatus.OK,
          message: 'soul update successfully',
          data: {
            steam_id: soul.steam_id,
            saint_soul: soul.saint_soul_type,
            soul: data.soul,
          },
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'soul update failed',
        };
      }
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'flag without',
      };
    }
  }

  @ApiOperation({ summary: '게임 시작 시 유저 소울 요청' })
  @Get('/start')
  async selectAllSoul(@Query() data: SelectAllSoulDto) {
    console.log('in router : ' + data);

    if (data) {
      const saint_souls = await this.SaintSoulsService.findOne(data.steam_id);
      const souls = await this.SoulsService.findAll(data.steam_id);

      return {
        statusCode: HttpStatus.OK,
        message: 'select successfully',
        data: {
          saint_souls,
          souls,
        },
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'select failed',
      };
    }
  }
}
