import { Injectable } from '@nestjs/common';
import { Stages } from './stages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(@InjectRepository(Stages) private stages: Repository<Stages>) {}

  async create(stage: Partial<Stages>): Promise<Stages> {
    return this.stages.save(stage);
  }
}
