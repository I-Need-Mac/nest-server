import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { PresetsService } from './presets.service';
import { ApiOperation } from '@nestjs/swagger';
import { encrypt } from '@utils/security';

@Controller('presets')
export class PresetsController {
  constructor(private PresetsService: PresetsService) {}
}
