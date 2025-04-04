import { Book } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {


    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        unique: true
    })
    name: string

    // books:string uno a muchos
    @OneToMany(() => Book, (book) => book.category,)
    books: Book[]

}
