import { Module } from '@nestjs/common';

import { Souls } from './souls.entity';
import { SaintSouls } from '../saint_souls/saint_souls.entity';
import { SoulsService } from './souls.service';
import { SaintSoulsService } from '../saint_souls/saint_souls.service';
import { SoulsController } from './souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Souls, SaintSouls])],
  providers: [SoulsService, SaintSoulsService],
  controllers: [SoulsController],
  exports: [SoulsService],
})
export class SoulsModule {}
