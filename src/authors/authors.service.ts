import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class AuthorsService {


  private readonly logger = new Logger('AuthorsService');

  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>
  ) { }

  create(createAuthorDto: CreateAuthorDto) {

    try {
      const author = this.authorsRepository.create(createAuthorDto)
      return this.authorsRepository.save(author);

    } catch (error) {
      this.logger.error(error)
      this.handleDBError(error);
    }

  }

  async findAll(paginationDto: PaginationDto) {

    const { limit, offset } = paginationDto;
    return await this.authorsRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {

    const author = await this.authorsRepository.findOne({
      where: { id },
    });

    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {

    const author = await this.authorsRepository.preload({
      id: id,
      ...updateAuthorDto
    });

    if (!author) throw new NotFoundException('Author not found');

    try {
      await this.authorsRepository.save(author);
      return author 

    } catch (error) {
      this.handleDBError(error);

    }
  }

  async remove(id: string) {

    const author = await this.findOne(id)
    this.authorsRepository.remove(author)
    return {
      message: 'Author removed'
    }
  }

  private handleDBError(error: any) {

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
