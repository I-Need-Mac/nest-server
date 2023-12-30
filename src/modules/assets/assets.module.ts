import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Assets } from './assets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from '../characters/characters.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Assets])],
  providers: [AssetsService],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude({
        path: 'assets',
        method: RequestMethod.GET,
      })
      .forRoutes('assets');
  }
}
