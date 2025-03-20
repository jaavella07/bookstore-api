import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    comment: string

    @Column('text')
    rating: string[]

    // books: string de uno a muchos
}
