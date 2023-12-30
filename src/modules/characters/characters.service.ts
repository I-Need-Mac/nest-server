import { Injectable } from '@nestjs/common';
import { Characters } from './characters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(@InjectRepository(Characters) private charactersRepository: Repository<Characters>) {
    this.charactersRepository = charactersRepository;
  }

  async create({ steam_id }: Partial<Characters>): Promise<Characters> {
    const newCharacter = this.charactersRepository.create({ steam_id });
    return await this.charactersRepository.save(newCharacter);
  }

  async update(steam_id: string, character_name: string): Promise<Characters> {
    const character = await this.charactersRepository.findOneBy({ steam_id: steam_id });

    if (!character) return character;
    switch (character_name) {
      case 'seimei':
        character.seimei = true;
        break;
      case 'macia':
        character.macia = true;
        break;
      case 'sinwol':
        character.sinwol = true;
        break;
      case 'siwoo':
        character.siWoo = true;
        break;
      case 'ulises':
        character.ulises = true;
        break;
      default:
        break;
    }
    return this.charactersRepository.save(character);
  }

  async findOne(steam_id: string): Promise<Characters> {
    return await this.charactersRepository.findOne({ where: { steam_id } });
  }
  async initializeCharacter(steam_id: string): Promise<Characters> {
    const character = await this.charactersRepository.findOneBy({ steam_id });

    if (!character) return character;
    character.hojin = true;
    character.seimei = false;
    character.macia = false;
    character.sinwol = false;
    character.siWoo = false;
    character.ulises = false;

    return this.charactersRepository.save(character);
  }
}
