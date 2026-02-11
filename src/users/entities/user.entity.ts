import { Entity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";

@Entity()
export class User 
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;    

    @Column()
    name:string;    

    @Column({default:true})
    isActive:boolean;
    
    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];

     @OneToMany(() => Order, order => order.user) 
    orders: Order[];

}
