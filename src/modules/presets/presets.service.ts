import { Injectable } from '@nestjs/common';
import { Presets } from './presets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresetsService {
  constructor(@InjectRepository(Presets) private presets: Repository<Presets>) {}

  async create(presets: Partial<Presets>): Promise<Presets> {
    return this.presets.save(presets);
  }
}
