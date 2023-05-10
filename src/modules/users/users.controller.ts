import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { RegisterDto, CheckDuplicatedDto } from './users.dto';

import { AssetsService } from '../assets/assets.service';

import { encrypt } from '@utils/security';
import { DataSource } from 'typeorm';

@Controller('auth')
export class UsersController {
  dataSource: DataSource;
  constructor(private usersService: UsersService, private assetsService: AssetsService) {}

  @ApiQuery({
    name: 'name',
  })
  @Get('/duplicated')
  async checkDuplicated(@Query() data: CheckDuplicatedDto) {
    const { name } = data;
    const isDuplicated = await this.usersService.checkDuplicated(name);
    console.log('in router :: ', name);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data: encrypt(JSON.stringify({ isDuplicated })),
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userPromise = this.usersService.create(data);
      const assetPromise = this.assetsService.create({ steam_id: data.steam_id });

      const [user, asset] = await Promise.all([userPromise, assetPromise]);

      console.log('in router :: ', user, asset);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
    };
  }
}
