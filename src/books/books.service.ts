import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Injectable()
export class BooksService {


    constructor(
      @InjectRepository(Book)
      private booksRepository: Repository<Book>,

      @InjectRepository(Author)
      private authorRepository: Repository<Author>,

      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,

      @InjectRepository(Review)
      private reviewRepository: Repository<Review>

    ){}


  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll() {
    return await this.booksRepository.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
