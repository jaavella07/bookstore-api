import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Author {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    fullname: string
    
    @Column('text')
    bio: string
    
    // books: string uno a muchos

}
