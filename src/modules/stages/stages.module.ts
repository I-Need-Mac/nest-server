import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stages } from './stages.entity';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { DecryptionMiddleware } from './stages.middleware';

import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';
import { PresetsService } from '../presets/presets.service';
import { Presets } from '../presets/presets.entity';
import { AssetsService } from '../assets/assets.service';
import { Assets } from '../assets/assets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stages, Presets, Assets])],
  providers: [StagesService, PresetsService, AssetsService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [StagesController],
})
export class StagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptionMiddleware).forRoutes('stage');
  }
}
