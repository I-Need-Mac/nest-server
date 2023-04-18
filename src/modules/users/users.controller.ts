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

  @Get('/users')
  async findAll() {
    const users = await this.usersService.findAll();
    console.log('in router :: ', users);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data: users,
    };
  }

  @Post('/regist')
  async createUser(@Body() data: RegisterDto) {
    const user = await this.usersService.create(data);
    console.log('in router :: ', user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
    };
  }
}
