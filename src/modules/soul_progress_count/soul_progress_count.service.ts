import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoulProgressCount } from './soul_progress_count.entity';

@Injectable()
export class SoulProgressCountService {
  constructor(
    @InjectRepository(SoulProgressCount) private soulProgressCountRepository: Repository<SoulProgressCount>,
  ) {}

  async create({ steam_id, souls_id, soul_name }: Partial<SoulProgressCount>): Promise<SoulProgressCount> {
    const newSoulProgress = this.soulProgressCountRepository.create({
      steam_id,
      souls_id,
      soul_name,
    });
    return await this.soulProgressCountRepository.save(newSoulProgress);
  }

  async findOne({ steam_id, souls_id, soul_name }): Promise<SoulProgressCount> {
    return await this.soulProgressCountRepository.findOne({
      where: { steam_id: steam_id, souls_id: souls_id, soul_name: soul_name },
    });
  }

  async update({ steam_id, souls_id, soul_name, now_count, max_count }): Promise<SoulProgressCount> {
    const userProgress = await this.soulProgressCountRepository.findOne({
      where: { steam_id: steam_id, souls_id: souls_id, soul_name: soul_name },
    });

    if (!userProgress) return userProgress;
    userProgress.now_count = now_count;
    userProgress.max_count = max_count;
    return await this.soulProgressCountRepository.save(userProgress);
  }
}
