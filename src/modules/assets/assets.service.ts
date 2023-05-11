import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assets } from './assets.entity';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Assets) private assetsRepository: Repository<Assets>) {
    this.assetsRepository = assetsRepository;
  }

  async create({ steam_id }: Partial<Assets>): Promise<Assets> {
    const newAssets = this.assetsRepository.create({ steam_id });
    return await this.assetsRepository.save(newAssets);
  }
}
