import { Injectable } from '@nestjs/common';
import { encrypt } from '@/common/utils/security';

@Injectable()
export class MedicinesService {
  async encrypt(data: any) {
    console.log(data);
    const data1 = encrypt(JSON.stringify(data.data));
    return { data: data1 };
  }
}
