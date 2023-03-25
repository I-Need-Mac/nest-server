import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { RegisterDto } from './medicines.entity';
import { MedicinesService } from './medicines.service';

@Controller('test')
export class MedicinesController {
  constructor(private medicinesService: MedicinesService) {}

  @Post()
  async createMedicine(@Body() data: RegisterDto) {
    const user = await this.medicinesService.encrypt(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }
}
