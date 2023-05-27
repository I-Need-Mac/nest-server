import { Injectable } from '@nestjs/common';
import { Stages } from './stages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(@InjectRepository(Stages) private stageRepository: Repository<Stages>) {
    this.stageRepository = stageRepository;
  }

  async create(stage: Partial<Stages>): Promise<Stages> {
    return this.stageRepository.save(stage);
  }

  async update(stage_id: number, stageData: Partial<Stages>): Promise<Stages> {
    const stage = await this.stageRepository.findOne({ where: { id: stage_id } });
    stage.is_clear = stageData.is_clear;
    stage.play_time = stageData.play_time;
    await this.stageRepository.save(stage);
    return stage;
  }
}
