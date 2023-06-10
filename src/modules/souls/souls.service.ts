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

  async soulCount(steam_id: string, saint_soul_type: number, soul: number) {
    var count: number;
    const userSoul = await this.soulRepogitory.findOneBy({ steam_id: steam_id, saint_soul_type: saint_soul_type });

    switch (soul) {
      case 1:
        count = userSoul.soul1;
        break;
      case 2:
        count = userSoul.soul2;
        break;
      case 3:
        count = userSoul.soul3;
        break;
      case 4:
        count = userSoul.soul4;
        break;
      case 5:
        count = userSoul.soul5;
        break;
      case 6:
        count = userSoul.soul6;
        break;
      case 7:
        count = userSoul.soul7;
        break;
      case 8:
        count = userSoul.soul8;
        break;
      case 9:
        count = userSoul.soul9;
        break;
      case 10:
        count = userSoul.soul10;
        break;
      case 11:
        count = userSoul.soul11;
        break;
      case 12:
        count = userSoul.soul12;
        break;
      case 13:
        count = userSoul.soul13;
        break;
      case 14:
        count = userSoul.soul14;
        break;
      case 15:
        count = userSoul.soul15;
        break;
      case 16:
        count = userSoul.soul16;
        break;
      case 17:
        count = userSoul.soul17;
        break;
      case 18:
        count = userSoul.soul18;
        break;
      default:
        break;
    }

    return count;
  }

  async unlockUpdate(steam_id: string, saint_soul_type: number, soul: number): Promise<Souls> {
    const userSoul = await this.soulRepogitory.findOneBy({ steam_id: steam_id, saint_soul_type: saint_soul_type });
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
