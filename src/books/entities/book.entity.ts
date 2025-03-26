import { Author } from "src/authors/entities/author.entity";
import { Category } from "src/categories/entities/category.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text',{
        unique: true
    })
    title: string

    @Column('text')
    description: string

    // author: string => de muchos a uno
    @ManyToOne(() => Author, (author) => author.books)
    author: Author


    // category: string = de muchos a uno
    @ManyToOne(() => Category, (category) => category.books,)
    category: Category

    // reviews: string =de muchos a uno
    @ManyToOne(() => Review, (review) => review.books)
    review: Review
}
