import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column()
  countryid: number;

  @PrimaryGeneratedColumn('uuid')
  countrycode: string;

  @OneToMany(() => Order, (order) => order.customerId)
  orders: Order[];
}
