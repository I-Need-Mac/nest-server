import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    this.usersRepository = usersRepository;
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async checkDuplicated(name: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ name });
    console.log(user, name, 'in duplicated check');
    if (user) return true;
    return false;
  }

  async create(user: Partial<Users>): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update({ steam_id, name }: Partial<Users>): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ steam_id, name });
    if (!user) return user;
    user.login_at = new Date();
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
