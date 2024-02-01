import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { SoulProgressCount } from './soul_progress_count.entity';
import { SoulProgressCountService } from './soul_progress_count.service';
import { SoulProgressCountController } from './soul_progress_count.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from '@/common/utils/middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([SoulProgressCount])],
  providers: [SoulProgressCountService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [SoulProgressCountController],
  exports: [SoulProgressCountService],
})
export class SoulProgressCountModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude({ path: 'soul-progress-count/soul-progress', method: RequestMethod.GET })
      .forRoutes('soul-progress-count');
  }
}
