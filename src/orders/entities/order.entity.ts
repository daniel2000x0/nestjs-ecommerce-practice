import { Country } from 'src/countries/entities/country.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrdersDetail } from 'src/orders-details/entities/orders-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('orders')
@Unique(['orderid'])
export class Order {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column()
  orderid: number;
  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customerid', referencedColumnName: 'customerid' })
  customer: Customer;
  @Column({ name: 'customerid' })
  customerid: number;
  @ManyToOne(() => Country, (country) => country.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customercountry', referencedColumnName: 'countryid' })
  country: Country;
  @Column({ name: 'customercountry' })
  customercountry: number;
  @Column({ name: 'customername', type: 'varchar', length: 100 })
  customerName: string;
  @Column({ name: 'customercity', type: 'varchar', length: 100 })
  customercity: string;

  @Column({ name: 'customerregion', type: 'varchar', length: 100 })
  customerregion: string;
  @Column({ name: 'customerzip', type: 'varchar', length: 10, nullable: true })
  customerzip: string;

  @Column({ name: 'customeraddress', type: 'varchar', length: 200 })
  customeraddress: string;
  @Column({
    name: 'customerphone',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  customerphone: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderdate: Date;
  @OneToMany(() => OrdersDetail, (detail) => detail.order, { cascade: true })
  details: OrdersDetail[];
}
