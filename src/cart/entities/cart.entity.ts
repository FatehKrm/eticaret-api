import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Cart 
{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => User,user => user.carts)
    user : User;

    @ManyToOne(() => Product)
    product : Product;

    @Column()
    quantity : number;
}
