import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  ) { }


  async create(createBookDto: CreateBookDto) {

    try {

      const author = await this.authorRepository.findOne({
        where: { id: createBookDto.authorId },
      });
      if (!author) throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);

      const category = await this.categoryRepository.findOne({
        where: { id: createBookDto.categoryId },
      });
      if (!category) throw new NotFoundException(`Category with ID ${createBookDto.categoryId} not found`);

      const review = await this.reviewRepository.findOne({
        where: { id: createBookDto.reviewId },
      });
      if (!review) throw new NotFoundException(`Reviwe with ID ${createBookDto.reviewId} not found`);

      const book = this.booksRepository.create({
        ...createBookDto,
        author,
        category,
        review
      });
      return this.booksRepository.save(book);

    } catch (error) {

      throw new InternalServerErrorException('Unexpected error, check server logs')

    }

  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOne(id: string) {

    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author', 'category', 'review']
    });

    if (!book) throw new NotFoundException(`Book with ${id} not found`);

    return book;

  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
