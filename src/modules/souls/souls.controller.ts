import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { SoulsService } from './souls.service';
import { ApiOperation } from '@nestjs/swagger';
import { encrypt } from '@utils/security';

@Controller('souls')
export class SoulsController {
  constructor(private SoulsService: SoulsService) {}
}
