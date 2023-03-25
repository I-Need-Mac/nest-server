import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterDto, CheckDuplicatedDto } from './users.dto';
import { ApiQuery } from '@nestjs/swagger';
import { encrypt } from '@utils/security';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiQuery({
    name: 'name',
  })
  @Get('/duplicated')
  async checkDuplicated(@Query() name: CheckDuplicatedDto) {
    // const isDuplicated = await this.usersService.checkDuplicated(name);
    const data = encrypt(JSON.stringify({ is_duplicated: false }));
    console.log('in router :: ', name);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data,
    };
  }

  @Post('/regist')
  async createUser(@Body() data: RegisterDto) {
    // const data = await this.usersService.findByUser(id);
    console.log('in router :: ', data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
    };
  }
}
