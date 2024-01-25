import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoulProgressCount } from './soul_progress_count.entity';

@Injectable()
export class SoulProgressCountService {
  constructor(@InjectRepository(SoulProgressCount) private soulProgressCountRepository: Repository<SoulProgressCount>) {
    this.soulProgressCountRepository = soulProgressCountRepository;
  }
}
