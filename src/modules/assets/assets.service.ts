import { Injectable } from '@nestjs/common';
import { Assets } from './assets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Assets) private assetsRepository: Repository<Assets>) {
    this.assetsRepository = assetsRepository;
  }

  async create(asset: Partial<Assets>): Promise<Assets> {
    return this.assetsRepository.save(asset);
  }

  async update(steam_id: string, key: number): Promise<Assets> {
    const asset = await this.assetsRepository.findOne({ where: { steam_id: steam_id } });
    asset.play_key = key;
    await this.assetsRepository.save(asset);
    return asset;
  }

  async findOne(steam_id: string): Promise<Assets> {
    return await this.assetsRepository.findOne({ where: { steam_id: steam_id } });
  }
}
