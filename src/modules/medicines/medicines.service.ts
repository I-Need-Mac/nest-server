import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicinesEntity } from './medicines.entity';
import encrypt from '@/common/utils/encrypt';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(MedicinesEntity)
    private medicinesRepository: Repository<MedicinesEntity>,
  ) {}

  async findByUser(ownerId: string) {
    return await this.medicinesRepository
      .createQueryBuilder('medicines')
      .where('ownerId=:ownerId', { ownerId })
      .execute();
  }

  async create(data: MedicinesEntity) {
    const data1 = encrypt(JSON.stringify({ hi: 'hello' }));
    return { data: data1 };
  }

  async update(id: string, data: Partial<MedicinesEntity>) {
    return await this.medicinesRepository.update({ id }, data);
  }
}
