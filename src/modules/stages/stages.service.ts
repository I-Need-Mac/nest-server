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
    stage.is_finished = true;
    stage.play_time = stageData.play_time;
    await this.stageRepository.save(stage);
    return stage;
  }

  async lastStageSelect(steam_id: string): Promise<Stages> {
    return await this.stageRepository.findOne({
      where: { steam_id: steam_id },
      order: { created_at: 'DESC' },
    });
  }

  async highStageSelect(steam_id: string): Promise<Stages> {
    return await this.stageRepository.findOne({
      where: { steam_id: steam_id },
      order: { stage: 'DESC' },
    });
  }
}
