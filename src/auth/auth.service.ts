import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createAuthDto: CreateAuthDto) {
    try {

      const { password, ...userData } = createAuthDto

      const user = await this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)
      delete user.password
      return user
      
    } catch (error) {

      this.handleDBError(error)

    }
  }

  private handleDBError(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
