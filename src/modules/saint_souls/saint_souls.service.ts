import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaintSouls } from './saint_souls.entity';

@Injectable()
export class SaintSoulsService {
  constructor(@InjectRepository(SaintSouls) private saintSoulsRepogitory: Repository<SaintSouls>) {}

  async create({ steam_id }: Partial<SaintSouls>): Promise<SaintSouls> {
    const newSaintSoul = this.saintSoulsRepogitory.create({ steam_id });
    return await this.saintSoulsRepogitory.save(newSaintSoul);
  }

  async findOne(steam_id: string): Promise<SaintSouls> {
    return await this.saintSoulsRepogitory.findOne({ where: { steam_id: steam_id } });
  }
}
