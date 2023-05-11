import { Injectable } from '@nestjs/common';
import { Presets } from './presets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresetsService {
  constructor(@InjectRepository(Presets) private presetRepository: Repository<Presets>) {}

  async create({ steam_id }: Partial<Presets>): Promise<Presets> {
    const newPreset = this.presetRepository.create({ steam_id });
    return await this.presetRepository.save(newPreset);
  }
}
