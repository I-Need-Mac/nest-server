import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assets } from './assets.entity';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Assets) private assetsRepository: Repository<Assets>) {
    this.assetsRepository = assetsRepository;
  }
  async update(steam_id: string, key: number): Promise<Assets> {
    const asset = await this.assetsRepository.findOne({ where: { steam_id: steam_id } });
    asset.key = key;
    await this.assetsRepository.save(asset);
    return asset;
  }

  async findOne(steam_id: string): Promise<Assets> {
    return await this.assetsRepository.findOne({ where: { steam_id: steam_id } });
  }

  async create({ steam_id }: Partial<Assets>): Promise<Assets> {
    const newAssets = this.assetsRepository.create({ steam_id });
    return await this.assetsRepository.save(newAssets);
  }
}
