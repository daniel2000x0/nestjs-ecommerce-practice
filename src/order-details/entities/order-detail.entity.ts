import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  serial: number;
  @JoinColumn({ name: 'orderid', referencedColumnName: 'orderid' })
  @ManyToOne(() => Order, (order) => order.orderid)
  orderid: Order;
  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'productid' })
  productid: Product;

  price: number;
  @Column({ type: 'int' })
  quantity: number;
  @Column()
  discount: number;
}
