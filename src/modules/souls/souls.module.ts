import { Module } from '@nestjs/common';

import { Souls } from './souls.entity';
import { SoulsService } from './souls.service';
import { SoulsController } from './souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalHttpExceptionFilter } from '@/common/errors/globalHttpException.filter';
import { GlobalValidationPipe } from '@/common/errors/globalValidatiion.pipe';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Souls])],
  controllers: [SoulsController],
  providers: [SoulsService],
  exports: [SoulsService],
})
export class SoulsModule {}
