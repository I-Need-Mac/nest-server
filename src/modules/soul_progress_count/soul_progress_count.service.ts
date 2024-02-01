import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoulProgressCount } from './soul_progress_count.entity';

@Injectable()
export class SoulProgressCountService {
  constructor(
    @InjectRepository(SoulProgressCount) private soulProgressCountRepository: Repository<SoulProgressCount>,
  ) {}

  async create({ steam_id, souls_id }: Partial<SoulProgressCount>): Promise<SoulProgressCount> {
    const newSoulProgress = this.soulProgressCountRepository.create({
      steam_id,
      souls_id,
    });
    return await this.soulProgressCountRepository.save(newSoulProgress);
  }

  async findOne({ steam_id, souls_id }): Promise<SoulProgressCount> {
    return await this.soulProgressCountRepository.findOne({
      where: { steam_id: steam_id, souls_id: souls_id },
    });
  }

  async findAll(steam_id: string): Promise<SoulProgressCount[]> {
    return await this.soulProgressCountRepository.find({ where: { steam_id: steam_id } });
  }

  async update({ steam_id, souls_id, now_count_list }): Promise<SoulProgressCount> {
    const userProgress = await this.soulProgressCountRepository.findOne({
      where: { steam_id: steam_id, souls_id: souls_id },
    });

    if (!userProgress) return userProgress;

    userProgress.soul1_count = now_count_list[0];
    userProgress.soul2_count = now_count_list[1];
    userProgress.soul3_count = now_count_list[2];
    userProgress.soul4_count = now_count_list[3];
    userProgress.soul5_count = now_count_list[4];
    userProgress.soul6_count = now_count_list[5];
    userProgress.soul7_count = now_count_list[6];
    userProgress.soul8_count = now_count_list[7];
    userProgress.soul9_count = now_count_list[8];
    userProgress.soul10_count = now_count_list[9];
    userProgress.soul11_count = now_count_list[10];
    userProgress.soul12_count = now_count_list[11];
    userProgress.soul13_count = now_count_list[12];
    userProgress.soul14_count = now_count_list[13];
    userProgress.soul15_count = now_count_list[14];
    userProgress.soul16_count = now_count_list[15];
    userProgress.soul17_count = now_count_list[16];
    userProgress.soul18_count = now_count_list[17];

    return await this.soulProgressCountRepository.save(userProgress);
  }
}
