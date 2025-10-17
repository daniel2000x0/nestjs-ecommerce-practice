import { Order } from 'src/orders/entities/order.entity';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column({ type: 'int', default: 0 })
  customerid: number;
  @Column({ type: 'varchar', length: 100, nullable: false, default: '' })
  customerfirstname: string;
  @Column({ type: 'varchar', length: 100, nullable: false, default: '' })
  customerlastname: string;
  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
    nullable: false,
    default: '',
  })
  customeremail: string;
  @Column({ type: 'varchar', length: 100, nullable: false, default: '' })
  customerpassword: string;
  @Column({ type: 'date', nullable: false })
  customerbirthdate: Date;
  @Column({ type: 'int', nullable: false, default: 0 })
  customergender: number;
  @OneToMany(() => ShoppingCart, (shopping) => shopping.customer)
  shopping: ShoppingCart[];
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
