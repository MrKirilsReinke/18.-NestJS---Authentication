import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

const scrypt = promisify(_scrypt);

declare global {
  interface Request {
    currentUser?: User;
  }
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async signup(email: string, password: string) {
    // See if email is in use

    const isEmailInUse = await this.userService.find(email);
    if (isEmailInUse) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash users password
    // 1. Generate salt
    const salt = randomBytes(8).toString('hex');

    // 2. Hash salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 3. Join hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create new user and save it
    const user = await this.userService.create(email, result);

    // Return the user
    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }

  async getCurrentUserId() {
    return this.request?.currentUser?.id;
  }
}
