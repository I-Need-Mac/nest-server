import { Injectable } from '@nestjs/common';
import { Souls } from './souls.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SoulsService {
  constructor(@InjectRepository(Souls) private soulRepogitory: Repository<Souls>) {}

  async create({ steam_id, saint_soul_type }: Partial<Souls>): Promise<Souls> {
    const newSoul = this.soulRepogitory.create({ steam_id, saint_soul_type });
    return await this.soulRepogitory.save(newSoul);
  }
}
