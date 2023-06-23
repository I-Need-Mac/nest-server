import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Characters } from './characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from '../assets/assets.service';
import { Assets } from '../assets/assets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characters, Assets])],
  controllers: [CharactersController],
  providers: [CharactersService, AssetsService],
  exports: [CharactersService, AssetsService],
})
export class CharactersModule {}
