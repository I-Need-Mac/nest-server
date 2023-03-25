import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterDto } from './users.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
