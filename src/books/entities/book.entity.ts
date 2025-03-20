import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    title: string
    
    @Column('text')
    description: string
    
    // author: string => de muchos a uno

    // category: string = de muchos a uno
    
    // reviews: string =de muchos a uno
}
