import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "src/books/entities/book.entity";


@Entity()
export class Author {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text',{
        unique: true
    })
    fullname: string
    
    @Column('text')
    bio: string
    
    // books: string uno a muchos
    @OneToMany(() => Book, (book) => book.author,{
        cascade: false,
        eager: true,
        
    })
    books: Book[]

}
