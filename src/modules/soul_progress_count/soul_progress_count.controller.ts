import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

import { SoulProgressCountService } from './soul_progress_count.service';
import {} from './soul_progress_count.dto';

import { SaintSoulsService } from '@/modules/saint_souls/saint_souls.service';
import { UsersService } from '../users/users.service';

@Controller('soul_progress_count')
export class SoulProgressCountController {
  constructor(
    private dataSource: DataSource,
    private SoulProgressCountService: SoulProgressCountService,
    private saintSoulsService: SaintSoulsService,
    private userService: UsersService,
  ) {}
}
