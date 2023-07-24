import { MiddlewareConsumer, Module } from '@nestjs/common';

import { Souls } from './souls.entity';
import { SoulsService } from './souls.service';
import { SoulsController } from './souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from '../characters/characters.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Souls])],
  controllers: [SoulsController],
  providers: [SoulsService],
  exports: [SoulsService],
})
export class SoulsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptionMiddleware).forRoutes('souls');
  }
}
