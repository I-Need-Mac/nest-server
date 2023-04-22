import { Injectable } from '@nestjs/common';
import { encrypt, decrypt } from '@/common/utils/security';

@Injectable()
export class MedicinesService {
  async encrypt(data: any) {
    console.log(data, 'in encrypt');
    const data1 = encrypt(JSON.stringify(data.data));
    return { data: data1 };
  }

  async decrypt(data: any) {
    console.log(data, 'in decrypt');
    const data1 = JSON.parse(decrypt(data.data));
    return { data: data1 };
  }
}
