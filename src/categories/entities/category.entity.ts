import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {


    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text')
    name:string
    
    // @Column('text')
    // books:string uno a muchos

}
