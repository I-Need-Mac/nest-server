import { Module } from '@nestjs/common';

import { Souls } from './souls.entity';
import { SoulsService } from './souls.service';
import { SoulsController } from './souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Souls])],
  controllers: [SoulsController],
  providers: [SoulsService],
  exports: [SoulsService],
})
export class SoulsModule {}
