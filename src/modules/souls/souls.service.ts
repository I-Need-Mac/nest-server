import { Injectable } from '@nestjs/common';
import { Souls } from './souls.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SoulsService {
  constructor(@InjectRepository(Souls) private souls: Repository<Souls>) {}

  async create(souls: Partial<Souls>): Promise<Souls> {
    return this.souls.save(souls);
  }
}
