import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ReviewsModule } from 'src/reviews/reviews.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorsModule,
    CategoriesModule,
    ReviewsModule],
  controllers: [BooksController

  ],
  providers: [BooksService],
})
export class BooksModule { }
