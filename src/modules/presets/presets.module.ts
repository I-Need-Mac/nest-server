import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { Presets } from './presets.entity';
import { PresetsService } from './presets.service';
import { PresetsController } from './presets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './presets.middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Presets])],
  providers: [PresetsService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [PresetsController],
  exports: [PresetsService],
})
export class PresetsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude(
        {
          path: 'preset/soul',
          method: RequestMethod.GET,
        },
        {
          path: 'preset/character',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('preset');
  }
}
