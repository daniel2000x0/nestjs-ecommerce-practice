import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('orders_details')
export class OrdersDetail {
  @PrimaryGeneratedColumn()
  serial: number;

  @Column()
  orderid: number;

  @Column()
  productid: number;

  @Column({ type: 'smallint' })
  quantity: number;

  @Column({ type: 'numeric', precision: 9, scale: 2 })
  unitprice: number;

  @Column({ type: 'smallint', default: 0 })
  discount: number;

  // 🔗 Relaciones

  @ManyToOne(() => Order, (order) => order.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'orderid', referencedColumnName: 'orderid' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'productid' })
  product: Product;
}
