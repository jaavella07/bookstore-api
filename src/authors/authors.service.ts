import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>
  ) { }

  create(createAuthorDto: CreateAuthorDto) {

    const author = this.authorsRepository.create(createAuthorDto)
    return this.authorsRepository.save(author);

  }

  async findAll() {
    return await this.authorsRepository.find();
  }

  async findOne(id: string) {

    const author = await this.authorsRepository.findOne({
      where: { id },
    });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsRepository.findOne({
      where: { id },
    });

    if (!author) throw new NotFoundException('Task not found');

    Object.assign(author, updateAuthorDto);
    return this.authorsRepository.save(author);
  }

  async remove(id: string) {

    const author = await this.findOne(id)
    this.authorsRepository.remove(author)
    return {
      message: 'Author removed'
    }
  }
}
