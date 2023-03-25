import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './users.middleware';
import { GlobalValidationFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, GlobalValidationFilter, GlobalValidationPipe],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptionMiddleware).forRoutes('auth');
  }
}
