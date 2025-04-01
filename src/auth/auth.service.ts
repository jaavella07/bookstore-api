import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
      return {
        ...user,
        token: this.getJwtToken({ email: user.email })
      }

    } catch (error) {

      this.handleDBError(error)

    }
  }

  async loginUser(loginAuthDto: LoginAuthDto) {

    const { password, email } = loginAuthDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }
    })

    if (!user) throw new UnauthorizedException('Credentials are not valied')

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valied')

      return {
        ...user,
        token: this.getJwtToken({ email: user.email })
      }

  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

  private handleDBError(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
