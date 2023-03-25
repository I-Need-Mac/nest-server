import { Controller, Get, Post, Patch, Body, Param, HttpStatus } from '@nestjs/common';

import { MedicinesService } from './medicines.service';
import { MedicinesEntity } from './medicines.entity';

@Controller('medicines')
export class MedicinesController {
  constructor(private medicinesService: MedicinesService) {}

  @Post()
  async createMedicine(@Body() data: MedicinesEntity) {
    const user = await this.medicinesService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }

  @Get(':id')
  async getMedicines(@Param('id') id: string) {
    const data = await this.medicinesService.findByUser(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async updateMedicine(@Param('id') id: string, @Body() data: Partial<MedicinesEntity>) {
    await this.medicinesService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }
}
