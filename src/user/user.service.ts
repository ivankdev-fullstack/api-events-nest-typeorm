import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '../libs/interfaces/user.interface';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  public async create(data: Omit<IUser, 'id'>): Promise<{ id: string }> {
    const createdUser = this.userRepository.create(data);
    await this.userRepository.save(createdUser);

    return { id: createdUser.id };
  }
}
