import { Injectable } from '@nestjs/common';
import { Souls } from './souls.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SoulsService {
  constructor(@InjectRepository(Souls) private soulRepogitory: Repository<Souls>) {}

  async create({ steam_id, saint_soul_type }: Partial<Souls>): Promise<Souls> {
    const newSoul = this.soulRepogitory.create({ steam_id, saint_soul_type });
    return await this.soulRepogitory.save(newSoul);
  }

  async findOne(steam_id: string): Promise<Souls> {
    return await this.soulRepogitory.findOne({ where: { steam_id: steam_id } });
  }

  async findAll(steam_id: string): Promise<Souls[]> {
    return await this.soulRepogitory.find({ where: { steam_id: steam_id } });
  }

  async soulCount(steam_id: string, saint_soul_type: number, soul: number) {
    const userSoul = await this.soulRepogitory.findOne({
      where: { steam_id: steam_id, saint_soul_type: saint_soul_type },
    });

    switch (soul) {
      case 1:
        return userSoul.soul1;
      case 2:
        return userSoul.soul2;
      case 3:
        return userSoul.soul3;
      case 4:
        return userSoul.soul4;
      case 5:
        return userSoul.soul5;
      case 6:
        return userSoul.soul6;
      case 7:
        return userSoul.soul7;
      case 8:
        return userSoul.soul8;
      case 9:
        return userSoul.soul9;
      case 10:
        return userSoul.soul10;
      case 11:
        return userSoul.soul11;
      case 12:
        return userSoul.soul12;
      case 13:
        return userSoul.soul13;
      case 14:
        return userSoul.soul14;
      case 15:
        return userSoul.soul15;
      case 16:
        return userSoul.soul16;
      case 17:
        return userSoul.soul17;
      case 18:
        return userSoul.soul18;
      default:
        return null;
    }
  }

  async unlockUpdate(steam_id: string, saint_soul_type: number, soul: number): Promise<Souls> {
    const userSoul = await this.soulRepogitory.findOne({
      where: { steam_id: steam_id, saint_soul_type: saint_soul_type },
    });
    if (!userSoul) return userSoul;
    switch (soul) {
      case 1:
        userSoul.soul1 = -1;
        break;
      case 2:
        userSoul.soul2 = -1;
        break;
      case 3:
        userSoul.soul3 = -1;
        break;
      case 4:
        userSoul.soul4 = -1;
        break;
      case 5:
        userSoul.soul5 = -1;
        break;
      case 6:
        userSoul.soul6 = -1;
        break;
      case 7:
        userSoul.soul7 = -1;
        break;
      case 8:
        userSoul.soul8 = -1;
        break;
      case 9:
        userSoul.soul9 = -1;
        break;
      case 10:
        userSoul.soul10 = -1;
        break;
      case 11:
        userSoul.soul11 = -1;
        break;
      case 12:
        userSoul.soul12 = -1;
        break;
      case 13:
        userSoul.soul13 = -1;
        break;
      case 14:
        userSoul.soul14 = -1;
        break;
      case 15:
        userSoul.soul15 = -1;
        break;
      case 16:
        userSoul.soul16 = -1;
        break;
      case 17:
        userSoul.soul17 = -1;
        break;
      case 18:
        userSoul.soul18 = -1;
        break;
      default:
        break;
    }

    return this.soulRepogitory.save(userSoul);
  }
}
