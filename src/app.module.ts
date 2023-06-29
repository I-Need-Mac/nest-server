import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';

import { AssetsModule } from '@assets/assets.module';
import { CharactersModule } from '@characters/characters.module';
import { MedicinesModule } from '@medicines/medicines.module';
import { PresetsModule } from '@presets/presets.module';
import { UsersModule } from '@users/users.module';
import { StagesModule } from './modules/stages/stages.module';
import { SaintSoulsModule } from './modules/saint_souls/saint_souls.module';
import { PresetsModule } from './modules/presets/presets.module';
import { AssetsModule } from './modules/assets/assets.module';
import { CharactersModule } from './modules/characters/characters.module';
import { SoulsModule } from './modules/souls/souls.module';
import { GameModule } from './modules/game/game.module';
import { RewardBoxesModule } from '@reward_boxes/reward_boxes.module';

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
    RewardBoxesModule,
    CharactersModule,
    GameModule,
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
