import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AssetsModule } from '@assets/assets.module';
import { CharactersModule } from '@characters/characters.module';
import { MedicinesModule } from '@medicines/medicines.module';
import { PresetsModule } from '@presets/presets.module';
import { UsersModule } from '@users/users.module';
import { StagesModule } from '@stages/stages.module';
import { SaintSoulsModule } from '@saint_souls/saint_souls.module';
import { SoulsModule } from '@souls/souls.module';

import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'develop' ? '.env.local' : '.env.production',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: process.env.PORT as any,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    MedicinesModule,
    UsersModule,
    StagesModule,
    SaintSoulsModule,
    SoulsModule,
    PresetsModule,
    AssetsModule,
    CharactersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      useClass: ValidationPipe,
      provide: APP_PIPE,
    },
  ],
})
export class AppModule {}
