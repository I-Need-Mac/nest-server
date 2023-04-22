import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { Souls } from './souls.entity';
import { SoulsService } from './souls.service';
import { SoulsController } from './souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptionMiddleware } from './souls.middleware';
import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Souls])],
  providers: [SoulsService, GlobalHttpExceptionFilter, GlobalValidationPipe],
  controllers: [SoulsController],
})
export class SoulsModule {}
