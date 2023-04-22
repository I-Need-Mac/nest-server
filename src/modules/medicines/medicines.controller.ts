import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { DecryptDto, EncrpytDto } from './medicines.entity';
import { MedicinesService } from './medicines.service';

@Controller('test')
export class MedicinesController {
  constructor(private medicinesService: MedicinesService) {}

  @Post('/encrpyt')
  async encrpytEndpoint(@Body() data: EncrpytDto) {
    const user = await this.medicinesService.encrypt(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }
  @Post('/decrpyt')
  async decrpytEndpoint(@Body() data: DecryptDto) {
    console.log('123');
    const user = await this.medicinesService.decrypt(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }
}
