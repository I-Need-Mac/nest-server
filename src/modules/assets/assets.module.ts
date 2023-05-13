import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { Assets } from './assets.entity';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './assets.middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assets])],
  providers: [AssetsService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}
