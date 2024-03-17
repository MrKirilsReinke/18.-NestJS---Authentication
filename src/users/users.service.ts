import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const newUser = this.userRepository.create({ email, password });

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        comments: true,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async find(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User is not found');
    } else {
      Object.assign(user, updateUserDto);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User is not found');
    } else {
      this.userRepository.delete(user);
    }
  }
}
