import { Country } from 'src/countries/entities/country.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  serial: number;
  @Column()
  orderid: number;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customerid', referencedColumnName: 'customerid' })
  customerId: Customer;
  @ManyToOne(() => Country, (country) => country.orders)
  @JoinColumn({ name: 'countrycode', referencedColumnName: 'countrycode' })
  customercountry: Country;
  @Column()
  customerName: string;
  @Column()
  customercity: string;
  @Column()
  customerregion: string;
  @Column()
  customerzip: string;
  @Column()
  customeraddress: string;
  @Column()
  customerphone: string;
}
