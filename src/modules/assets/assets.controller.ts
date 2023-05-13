import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { AssetsService } from './assets.service';
import { ApiOperation } from '@nestjs/swagger';
import { encrypt } from '@utils/security';

@Controller('assets')
export class AssetsController {
  constructor(private AssetsService: AssetsService) {}
}
