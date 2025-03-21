import { Book } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Author {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    fullname: string
    
    @Column('text')
    bio: string
    
    // books: string uno a muchos
    // @OneToMany(() => Book, (book) => book.author,{
    //     cascade: true,
    //     eager: true
    // })
    // books: Book[]

}
