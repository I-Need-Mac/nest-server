import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//controller
import { GameController } from './game.controller';
//entity
import { Stages } from '../stages/stages.entity';
import { Presets } from '../presets/presets.entity';
import { SaintSouls } from '../saint_souls/saint_souls.entity';
import { Souls } from '../souls/souls.entity';
import { Characters } from '../characters/characters.entity';
import { Reward_boxes } from '../reward_boxes/reward_boxes.entity';
import { Assets } from '../assets/assets.entity';
//service
import { GameService } from './game.service';
import { StagesService } from '../stages/stages.service';
import { PresetsService } from '../presets/presets.service';
import { SaintSoulsService } from '../saint_souls/saint_souls.service';
import { SoulsService } from '../souls/souls.service';
import { CharactersService } from '../characters/characters.service';
import { AssetsService } from '../assets/assets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stages, Presets, SaintSouls, Souls, Characters, Reward_boxes, Assets])],
  providers: [
    GameService,
    StagesService,
    PresetsService,
    SaintSoulsService,
    SoulsService,
    CharactersService,
    AssetsService,
  ],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
