import { Module } from '@nestjs/common';
import { SaintSoulsService } from './saint_souls.service';
import { SaintSoulsController } from './saint_souls.controller';

@Module({
  providers: [SaintSoulsService],
  controllers: [SaintSoulsController],
})
export class SaintSoulsModule {}
