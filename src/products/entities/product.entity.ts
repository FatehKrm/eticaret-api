import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column('text')
    description : string;

    @Column('decimal')
    price : number;

    @Column()
    stock : number;

    @Column({ nullable: true })
    imageUrl : string;

    @Column({ default: true })
    isActive: boolean;
}
