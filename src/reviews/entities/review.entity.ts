import { Book } from "src/books/entities/book.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    comment: string

    @Column('text')
    rating: string[]

    // books: string de uno a muchos
    @OneToMany(() => Book, (book) => book.review)
    books: Book[]

}
