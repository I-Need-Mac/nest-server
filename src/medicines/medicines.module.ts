import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesEntity } from './medicines.entity';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicinesEntity])],
  providers: [MedicinesService],
  controllers: [MedicinesController],
})
export class MedicinesModule {}
