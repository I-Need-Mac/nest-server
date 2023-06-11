import { Module } from '@nestjs/common';
import { RewardBoxesService } from './reward_boxes.service';
import { RewardBoxesController } from './reward_boxes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardBoxes } from './reward_boxes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RewardBoxes])],
  providers: [RewardBoxesService],
  controllers: [RewardBoxesController],
  exports: [RewardBoxesService],
})
export class RewardBoxesModule {}
