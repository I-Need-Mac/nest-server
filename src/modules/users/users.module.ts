import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Assets } from '@/modules/assets/assets.entity';
import { AssetsService } from '@/modules/assets/assets.service';
import { Characters } from '@/modules/characters/characters.entity';
import { CharactersService } from '@/modules/characters/characters.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './users.middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Assets, Characters])],
  providers: [UsersService, AssetsService, CharactersService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptionMiddleware)
      .exclude(
        {
          path: 'auth/duplicated',
          method: RequestMethod.GET,
        },
        {
          path: 'auth/users',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('auth');
  }
}
