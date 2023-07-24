import { Controller, Body, HttpStatus, Patch } from '@nestjs/common';
import { SoulsService } from './souls.service';
import { ApiOperation } from '@nestjs/swagger';

import { updateSoulDto } from './souls.dto';

@Controller('souls')
export class SoulsController {
  constructor(private SoulsService: SoulsService) {}

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
}
