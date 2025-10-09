import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shopping_cart')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  serial: number;
  @ManyToOne(() => Customer, (customer) => customer.shopping)
  @JoinColumn({ name: 'customerid', referencedColumnName: 'customerid' })
  customer: Customer;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable({
    name: 'shopping_cart_products', // tabla intermedia
    joinColumn: {
      name: 'shopping_cart_serial',
      referencedColumnName: 'serial',
    },
    inverseJoinColumn: { name: 'productid', referencedColumnName: 'productid' },
  })
  products: Product[];
}
