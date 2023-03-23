import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicinesEntity } from './medicines.entity';

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
    const user = this.medicinesRepository.create(data);
    await this.medicinesRepository.save(data);
    return user;
  }

  async update(id: string, data: Partial<MedicinesEntity>) {
    return await this.medicinesRepository.update({ id }, data);
  }
}
