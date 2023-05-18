import { Module } from '@nestjs/common';
import { SaintSoulsService } from './saint_souls.service';
import { SaintSoulsController } from './saint_souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaintSouls } from './saint_souls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaintSouls])],
  providers: [SaintSoulsService],
  controllers: [SaintSoulsController],
  exports: [SaintSoulsService],
})
export class SaintSoulsModule {}
