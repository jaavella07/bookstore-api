import 'dotenv/config';
import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [
        
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    AuthorsModule,
    CategoriesModule,
    ReviewsModule,
    CommonModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
