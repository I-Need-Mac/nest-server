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
}
