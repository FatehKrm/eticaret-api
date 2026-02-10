import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order/entities/orderItem.entity';

export enum OrderStatus{
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
    PROCESSING = 'PROCESSING',  
}
@Entity()
export class Order
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    orderItems: OrderItem[];

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number;

    @Column ({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({nullable: true})
    shippingAddress: string;

    @Column({nullable: true})
    phoneNumber: string;    

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    deliveredAt: Date;
   
}
