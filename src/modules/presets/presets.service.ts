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

  async update(steam_id: string, presetData: Partial<Presets>): Promise<Presets> {
    const preset = await this.presetRepository.findOne({ where: { steam_id: steam_id } });
    preset.saint_soul_type = presetData.saint_soul_type;
    if (presetData.soul1 !== undefined) {
      preset.soul1 = presetData.soul1;
      preset.soul2 = presetData.soul2;
      preset.soul3 = presetData.soul3;
      preset.soul4 = presetData.soul4;
      preset.soul5 = presetData.soul5;
      preset.soul6 = presetData.soul6;
    }
    preset.character = presetData.character;
    await this.presetRepository.save(preset);
    return preset;
  }

  async findOne(steam_id: string): Promise<Presets> {
    return this.presetRepository.findOne({ where: { steam_id: steam_id } });
  }
}
